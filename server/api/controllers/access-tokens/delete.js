module.exports = {
    async fn() {
        await sails.helpers.utils.logApi(this.req.isSocket, `DELETE /api/access-tokens/me : access-tokens/delete`)


        const { accessToken } = this.req;

        await Session.updateOne({
          accessToken,
          deletedAt: null,
        }).set({
          deletedAt: new Date().toISOString(),
        });

        return {
            item: accessToken,
        }
    }
}
