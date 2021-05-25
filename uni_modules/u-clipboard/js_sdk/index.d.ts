/**
 * 获取系统剪贴板内容
 * @returns 剪贴板内容
 */
export declare function getClipboardData(): Promise<string>

/**
 * 设置系统剪贴板的内容
 * @param data 需要设置的内容
 * @returns 设置的内容
 */
export declare function setClipboardData(data: string): Promise<string>
