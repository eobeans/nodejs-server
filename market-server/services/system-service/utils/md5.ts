import md5 from "md5";

export const autograph = (val: string = '') => {
    return md5(val)
}