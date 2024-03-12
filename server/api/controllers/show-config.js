module.exports = {
    fn() {
      let stringArray = ["silly", "verbose", "info"]
      if (stringArray.indexOf(sails.config.log.level) > -1) {
          if (this.req.isSocket)
              sails.log(`socket -> GET /api/config : show-config`)
          else
              sails.log(`http -> GET /api/config : show-config`)
      }
      // let oidc = null;
        // if (sails.hooks.oidc.isActive()) {
        //   const oidcClient = sails.hooks.oidc.getClient();
        //
        //   oidc = {
        //     authorizationUrl: oidcClient.authorizationUrl({
        //       scope: sails.config.custom.oidcScopes,
        //       response_mode: 'fragment',
        //     }),
        //     endSessionUrl: oidcClient.issuer.end_session_endpoint ? oidcClient.endSessionUrl({}) : null,
        //   };
        // }

        return {
            item: {
                oidc: null
            },
        };
    },
};
