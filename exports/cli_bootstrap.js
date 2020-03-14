/* Cli BootStrap (cbs)*/

exports.init = function(w, h) {
  let cbs = {
    cliw:w,
    clih:h,
    W: 12,
    H: 6,
    strapW: function(clisize) {
      return Math.floor(clisize / cbs.W);
    },
    strapH: function(clisize) {
      return Math.floor(clisize / cbs.H);
    },

    /**
    * BootStrapBloc H W  bsbH bsbW
    * @description description
    * @param {String} bsize - a int between [1-12] where 1 == screenSize and 12 ==
    * @return {integer} - the size relative to bootstrap bloc sized * bsize
    */

    bsbW: function(bsize) {
      if (bsize < 1) bsize = 1;
      if (bsize > cbs.W) bsize = cbs.W;
      return cbs.strapW(cbs.cliw) * ((cbs.W) / bsize)
    },
    bsbH: function(bsize) {
      if (bsize < 1) bsize = 1;
      if (bsize > cbs.H) bsize = cbs.H;
      return cbs.strapH(cbs.clih) * ((cbs.H) / bsize)
    }
  }
  return cbs;
}
