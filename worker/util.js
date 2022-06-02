/**
 *
 * @param {number} ms milliseconds
 * @returns {Promise<boolean>} void
 */
module.exports.sleep = async function sleep(ms) {
  return new Promise((res, _rej) => {
    setTimeout(() => res(true), parseInt(ms, 10))
  })
}
