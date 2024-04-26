using Mediator;
using ReSound.Server.Repositories.Files;

namespace ReSound.Server.ApiQueries.GetFilesNames
{
    public class GetFilesHandler : IRequestHandler<GetFilesQuery, GetFilesResponse>
    {
        private FilesRepository _filesRepository;

        public GetFilesHandler(FilesRepository filesRepository)
        {

            this._filesRepository = filesRepository;

        }
        public async ValueTask<GetFilesResponse> Handle(GetFilesQuery request, CancellationToken cancellationToken)
        {
            var files = await _filesRepository.GetFileNames();
            return await new ValueTask<GetFilesResponse>(
                new GetFilesResponse { Files = files }
                );
        }
    }
}
