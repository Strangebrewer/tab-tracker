import API from './API'

export default {
   index(search) {
      return API().get('/songs', { params: { search } });
   },
   post(song) {
      return API().post('/songs', song);
   },
   show(songId) {
      return API().get(`/songs/${songId}`);
   },
   put(song) {
      return API().put(`/songs/${song.id}`, song);
   }
}