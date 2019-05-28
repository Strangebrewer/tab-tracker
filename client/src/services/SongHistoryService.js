import API from './API'

export default {
   index() {
      return API().get('/histories');
   },
   post(history) {
      return API().post('/histories', history);
   },
   delete(historyId) {
      return API().delete(`/histories/${historyId}`);
   }
}