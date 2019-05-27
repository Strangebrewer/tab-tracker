import API from './API'

export default {
   index() {
      return API().get('/songs');
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