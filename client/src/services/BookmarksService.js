import API from './API'

export default {
   index(bookmark) {
      return API().get('/bookmarks', { params: bookmark });
   },
   post(bookmark) {
      return API().post('/bookmarks', bookmark);
   },
   delete(bookmarkId) {
      return API().delete(`/bookmarks/${bookmarkId}`);
   }
}