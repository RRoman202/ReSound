using Microsoft.EntityFrameworkCore;
using ReSound.Server.Data.Models;
using static System.Net.Mime.MediaTypeNames;
using System.Data;

namespace ReSound.Server.Data
{
    public class ReSoundContext : DbContext
    {
        public ReSoundContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Sequencer> Sequencers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Mark> Marks { get; set; }
        public DbSet<Genre> Genres { get; set;}
        public DbSet<Follower> Followers { get; set;}
        public DbSet<SequencerTemplate> SequencersTemplates { get; set;}
        public DbSet<SequencerTrack> SequencersTracks { get; set;}
        public DbSet<SettingsSequencer> SequencersSettings { get; set;}
        public DbSet<Sound> Sounds { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<TrackTemplate> TrackTemplates { get; set; }
        public DbSet<SequencerGenre> SequencerGenres { get; set; }
        public DbSet<Favorite> Favorites { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Sequencer>().ToTable("sequencer");
            modelBuilder.Entity<Comment>().ToTable("comment");
            modelBuilder.Entity<Mark>().ToTable("mark");
            modelBuilder.Entity<Genre>().ToTable("genre");
            modelBuilder.Entity<Follower>().ToTable("follower");
            modelBuilder.Entity<SequencerTemplate>().ToTable("sequencer_template");
            modelBuilder.Entity<SequencerTrack>().ToTable("sequencer_track");
            modelBuilder.Entity<SettingsSequencer>().ToTable("settings_sequencer");
            modelBuilder.Entity<Sound>().ToTable("sound");
            modelBuilder.Entity<Template>().ToTable("template");
            modelBuilder.Entity<Track>().ToTable("track");
            modelBuilder.Entity<TrackTemplate>().ToTable("track_template");
            modelBuilder.Entity<SequencerGenre>().ToTable("sequencer_genre");
            modelBuilder.Entity<Favorite>().ToTable("favorite");
            base.OnModelCreating(modelBuilder);
        }

    }
}
