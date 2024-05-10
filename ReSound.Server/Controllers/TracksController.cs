using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ReSound.Server.Data;
using ReSound.Server.Data.Models;
using ReSound.Server.DTO;

namespace ReSound.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TracksController : ControllerBase
    {
        private readonly ReSoundContext _context;

        private readonly IWebHostEnvironment _env;

        public TracksController(ReSoundContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public async Task<IEnumerable<Sequencer>> GetTracks()
        {
            var folderPath = Path.Combine(_env.WebRootPath, "tracks");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }
            return await _context.Sequencers
                .Where(s => s.Private == false && fileNamesNoMp3.Contains(s.IdSequencer.ToString())).Include(s => s.User)
                .ToListAsync();
        }

        [HttpGet("Follower")]
        public async Task<IEnumerable<Sequencer>> GetFollowerTracks(Guid iduser)
        {
            var folderPath = Path.Combine(_env.WebRootPath, "tracks");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }

            var usersid = await _context.Followers
                .Where(st => st.IdFollower == iduser)
                
                .ToListAsync();

            var users = new List<User>();

            foreach (var userId in usersid)
            {
                var user = await _context.Users.FindAsync(userId.IdUser);
                if (user != null)
                {
                    users.Add(user);
                }
            }

            var tracks = new List<Sequencer>();

            foreach (var user in users)
            {
                var trackuser = _context.Sequencers.Where(x => x.IdUser == user.IdUser && x.Private == false && fileNamesNoMp3.Contains(x.IdSequencer.ToString())).ToList();
                tracks.AddRange(trackuser);
            }

            return tracks;
        }

        [HttpGet("user")]
        public async Task<IEnumerable<Sequencer>> GetUserTracks(Guid iduser)
        {
            var folderPath = Path.Combine(_env.WebRootPath, "tracks");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }
            return await _context.Sequencers
                .Where(s => s.Private == false && s.IdUser == iduser && fileNamesNoMp3.Contains(s.IdSequencer.ToString())).Include(s => s.User)
                .ToListAsync();
        }

        [HttpGet("comment")]
        public async Task<IEnumerable<Comment>> GetCommentTrack(Guid idsequencer)
        {
            var comments = await _context.Comments.Where(x => x.IdSequencer == idsequencer).Include(x => x.User).ToListAsync();
            return comments;
        }

        [HttpGet("last-comment")]
        public async Task<IEnumerable<Comment>> GetLastCommentTrack()
        {
            var comments = await _context.Comments
                .Include(x => x.User)
                .OrderByDescending(x => x.Created)
                .Take(3) 
                .ToListAsync();

            return comments;
        }

        [HttpPost("comment")]
        public async Task<IActionResult> PostComment(CommentDTO comment)
        {
            var newcomment = new Comment
            {
                IdComment = Guid.NewGuid(),
                IdSequencer = comment.IdSequencer,
                IdUser = comment.IdUser,
                Content = comment.Content,
                Created = DateTime.UtcNow,
                User = await _context.Users.FindAsync(comment.IdUser)

            };
            await _context.Comments.AddAsync(newcomment);
            await _context.SaveChangesAsync();
            return Ok(newcomment);
        }

        [HttpPost("mark")]
        public async Task<IActionResult> PostMark(MarkDTO mark)
        {

            var newmark = new Mark
            {
                IdMark = Guid.NewGuid(),
                IdSequencer = mark.IdSequencer,
                IdUser = mark.IdUser,
                Value = mark.Value,
                Created = DateTime.UtcNow,
                User = await _context.Users.FindAsync(mark.IdUser)

            };
            var marks = await _context.Marks.Where(x => x.IdSequencer == mark.IdSequencer && x.IdUser == mark.IdUser).FirstOrDefaultAsync();
            if(marks == null)
            {
                await _context.Marks.AddAsync(newmark);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.Marks.Remove(marks);
                await _context.Marks.AddAsync(newmark);
                await _context.SaveChangesAsync();
            }
            
            return Ok(newmark);
        }

        [HttpGet("mark")]
        public async Task<Mark> GetMarkTrack(Guid idsequencer, Guid iduser)
        {
            var marks = await _context.Marks.Where(x => x.IdSequencer == idsequencer && x.IdUser == iduser).FirstOrDefaultAsync();
            if(marks == null)
            {
                return null;
            }
            else
            {
                return marks;
            }
            
        }

        [HttpGet("rating")]
        public async Task<double> GetRatingTrack(Guid idsequencer)
        {
            var marks = await _context.Marks.Where(x => x.IdSequencer == idsequencer).Include(x => x.User).ToListAsync();
            var values = marks.Select(x => x.Value).ToList();
            double rating = values.Average();
            return Math.Round(rating, 2);
        }

        [HttpGet("genres")]
        public async Task<IEnumerable<Genre>> GetGenres()
        {
            var genres = await _context.Genres.ToListAsync();
            return genres;
        }

        [HttpGet("popularite")]
        public async Task<IEnumerable<Sequencer>> GetPopulariteTrack()
        {
            var folderPath = Path.Combine(_env.WebRootPath, "tracks");

            var fileNames = Directory.GetFiles(folderPath)
                .Select(Path.GetFileName)
                .ToList();

            var fileNamesNoMp3 = new List<string>();

            foreach (var file in fileNames)
            {
                fileNamesNoMp3.Add(file.Replace(".mp3", ""));
            }

            var sequencers = await _context.Sequencers.ToListAsync();

            var populariteList = new List<PopulariteDTO>();

            foreach(var s in sequencers)
            {
                populariteList.Add(new PopulariteDTO
                {
                    IdSequencer = s.IdSequencer,
                    Popularite = CalculatePopularite(s.IdSequencer)
                });
            }

            var sortedSequencers = populariteList
                .OrderByDescending(item => item.Popularite)
                .Select(item => sequencers.First(s => s.IdSequencer == item.IdSequencer)).Where(x => x.Private == false && fileNamesNoMp3.Contains(x.IdSequencer.ToString()))
                .ToList();

            return sortedSequencers;
        }

        private double CalculatePopularite(Guid idsequencer)
        {
            
            var marks = _context.Marks.Where(x => x.IdSequencer == idsequencer).Include(x => x.User).ToList();
            if (marks.Count == 0)
            {
                return 0;
            }
            var values = marks.Select(x => x.Value).ToList();
            double rating = values.Average();
            var likes =_context.Favorites.Where(x => x.IdSequencer == idsequencer).Include(x => x.User).ToList();
            var like_count = likes.Count();
            var seq = _context.Sequencers.Find(idsequencer);
            var views_count = seq.Views;
            double popularite = (like_count * 1) + (views_count * 0.5) + (rating * 2);
            
            return popularite;
        }

        [HttpGet("likes-count")]
        public long GetLikesCount(Guid idsequencer)
        {
            var likes = _context.Favorites.Where(x => x.IdSequencer == idsequencer).Include(x => x.User).ToList();
            var like_count = likes.Count();
            return like_count;
        }

        [HttpPatch("views")]
        public async Task AddViews(Guid idsequencer)
        {
            var sequencer = await _context.Sequencers.SingleAsync(x => x.IdSequencer == idsequencer);
            if (sequencer != null)
            {
                sequencer.Views += 1;
            }
            else
            {
                sequencer.Views = 1;
            }

            await _context.SaveChangesAsync();

            return;
        }

        [HttpPost("Favorite")]
        public async Task<Favorite> PostFavorite(FavoriteDTO favorite)
        {
            var newfavorite = new Favorite
            {
                Id = Guid.NewGuid(),
                IdUser = favorite.IdUser,
                IdSequencer = favorite.IdSequencer,
            };


            _context.Favorites.Add(newfavorite);
            await _context.SaveChangesAsync();

            return newfavorite;
        }

        [HttpPost("seq-genre")]
        public async Task<SequencerGenre> PostSequencerGenre(SequencerGenreDTO sequencerGenreDTO)
        {
            string[] genres = sequencerGenreDTO.genres.Split(',');
            var seq = await _context.SequencerGenres.Where(x => x.IdSequencer == sequencerGenreDTO.IdSequencer).ToListAsync();
            _context.SequencerGenres.RemoveRange(seq);
            foreach(var g in genres)
            {
                var seqgen = new SequencerGenre
                {
                    Id = Guid.NewGuid(),
                    IdGenre = new Guid(g),
                    IdSequencer = sequencerGenreDTO.IdSequencer,

                };
                _context.SequencerGenres.Add(seqgen);
            }
            await _context.SaveChangesAsync();

            return null;
        }

        [HttpDelete("Favorite")]
        public async Task DeleteFavorite(FavoriteDTO favorite)
        {
            var favoritedelete = _context.Favorites.Where(x => x.IdSequencer == favorite.IdSequencer && x.IdUser == favorite.IdUser).FirstOrDefault();

            _context.Favorites.Remove(favoritedelete);
            await _context.SaveChangesAsync();

            return;
        }

        [HttpGet("Favorite")]
        public async Task<IEnumerable<Sequencer>> GetFavorites(Guid iduser)
        {
            var usersid = await _context.Favorites
                .Where(st => st.IdUser == iduser)
                .ToListAsync();

            var sequencers = new List<Sequencer>();

            foreach (var userId in usersid)
            {
                var sequencer = await _context.Sequencers.FindAsync(userId.IdSequencer);
                if (sequencer != null)
                {
                    sequencers.Add(sequencer);
                }
            }


            return sequencers;
        }

        [HttpGet("track-genre")]
        public async Task<IEnumerable<Genre>> GetTrackGenre(Guid idsequencer)
        {
            var seq = await _context.SequencerGenres.Where(x => x.IdSequencer == idsequencer).ToListAsync();

            var genres = new List<Genre>();

            foreach (var s in seq)
            {
                var genre = await _context.Genres.FindAsync(s.IdGenre);
               
                if (genre != null)
                {
                    genres.Add(genre);
                }
            }

            return genres;
        }

        [HttpGet("track-by-genre")]
        public async Task<IEnumerable<Sequencer>> GetTrackByGenre(string genres)
        {
            string[] gens = genres.Split(',');
            var seq = new List<SequencerGenre>();
            foreach(var g in gens)
            {
                var seqs = await _context.SequencerGenres.Where(x => x.IdGenre == new Guid(g)).ToListAsync();
                if(seqs != null)
                {
                    seq.AddRange(seqs);
                }
            }
            var sequencers = new List<Sequencer>();

            foreach (var s in seq)
            {
                var sequencer = await _context.Sequencers.FindAsync(s.IdSequencer);
                if(sequencer != null)
                {
                    sequencers.Add(sequencer);
                }
            }

            return sequencers.Distinct();
        }

        [HttpGet("genre-name")]
        public async Task<Genre> GetGenreName(Guid idgenre)
        {
            var genre = await _context.Genres.FindAsync(idgenre);
            return genre;
            
            
        }

        [HttpGet("genre-count")]
        public async Task<IEnumerable<GenreCountDTO>> GetGenreCount()
        {
            var genres = await _context.Genres.ToListAsync();
            var genres_count = new List<GenreCountDTO>();
            foreach(var genre in genres)
            {
                var count = await _context.SequencerGenres.Where(x => x.IdGenre == genre.IdGenre).ToListAsync();

                var gen_count = new GenreCountDTO {
                    IdGenre = genre.IdGenre,
                    Name = genre.Name,
                    Count = count.Count()
                };

                genres_count.Add(gen_count);
            }

            return genres_count;
        }


    }
}
