/**
 * 获取系统剪贴板内容
 * @returns {Promise<string>} 剪贴板内容
 */
export function getClipboardData() {
  return new Promise((success, fail) => {
    // #ifndef H5
    uni.getClipboardData({
      success: ({ data }) => success(data),
      fail
    })
    // #endif

    // #ifdef H5
    try {
      navigator.clipboard.readText().then(success).catch(fail)
    } catch (error) {
      fail(error)
    }
    // #endif
  })
}

/**
 * 设置系统剪贴板的内容
 * @param {string} data 需要设置的内容
 * @returns {Promise<string>} 设置的内容
 */
export function setClipboardData(data) {
  return new Promise((success, fail) => {
    // #ifndef H5
    uni.setClipboardData({ data, success, fail })
    // #endif

    // #ifdef H5
    const textarea = document.createElement('textarea')
    textarea.value = data
    textarea.readOnly = true
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, data.length)
    document.execCommand('copy')
    textarea.remove()
    success(data)
    // #endif
  })
}
