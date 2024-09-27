const Film = require('../models/Film');
const {
    createFilm,
    getAllFilms,
    getFilmById,
    updateFilm,
    deleteFilm,
} = require('../services/filmService');

jest.mock('../models/Film'); 

describe('Film Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createFilm', () => {
        it('should create a new film successfully', async () => {
            const filmData = { title: 'Inception', director: 'Christopher Nolan' };
            const savedFilm = { ...filmData, _id: '123' };
            Film.mockImplementation(() => ({ save: jest.fn().mockResolvedValue(savedFilm) }));

            const result = await createFilm(filmData);
            expect(result).toEqual(savedFilm);
            expect(Film).toHaveBeenCalledWith(filmData);
        });

        it('should throw an error if film creation fails', async () => {
            const filmData = { title: 'Inception', director: 'Christopher Nolan' };
            Film.mockImplementation(() => ({ save: jest.fn().mockRejectedValue(new Error('Error saving film')) }));

            await expect(createFilm(filmData)).rejects.toThrow('Error saving film');
        });
    });

    describe('getAllFilms', () => {
        it('should return all films', async () => {
            const films = [{ title: 'Inception' }, { title: 'Interstellar' }];
            Film.find.mockResolvedValue(films);

            const result = await getAllFilms();
            expect(result).toEqual(films);
            expect(Film.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('getFilmById', () => {
        it('should return a film by id', async () => {
            const film = { title: 'Inception', _id: '123' };
            Film.findById.mockResolvedValue(film);

            const result = await getFilmById('123');
            expect(result).toEqual(film);
            expect(Film.findById).toHaveBeenCalledWith('123');
        });

        it('should return null if film not found', async () => {
            Film.findById.mockResolvedValue(null);

            const result = await getFilmById('456');
            expect(result).toBeNull();
            expect(Film.findById).toHaveBeenCalledWith('456');
        });
    });

    describe('updateFilm', () => {
        it('should update a film successfully', async () => {
            const updatedFilm = { title: 'Inception 2' };
            Film.findByIdAndUpdate.mockResolvedValue(updatedFilm);

            const result = await updateFilm('123', updatedFilm);
            expect(result).toEqual(updatedFilm);
            expect(Film.findByIdAndUpdate).toHaveBeenCalledWith('123', updatedFilm, { new: true });
        });
    });

    describe('deleteFilm', () => {
        it('should delete a film successfully', async () => {
            Film.findByIdAndDelete.mockResolvedValue(true);

            const result = await deleteFilm('123');
            expect(result).toBe(true);
            expect(Film.findByIdAndDelete).toHaveBeenCalledWith('123');
        });
    });
});
