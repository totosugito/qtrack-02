module.exports = {
    async fn() {
        await sails.helpers.utils.logApi(this.req.isSocket, `DELETE /api/access-tokens/me : access-tokens/delete`)

        const { accessToken } = this.req;

        await Session.updateOne({
          access_token: accessToken,
          deletedAt: null,
        }).set({
          deletedAt: new Date().toISOString(),
        })

        // await Session.destroyOne({
        //   access_token: accessToken,
        //   deletedAt: null,
        // })

        return {
            item: accessToken,
        }
    }
}
