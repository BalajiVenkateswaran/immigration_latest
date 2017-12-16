export class DeepCloneUtil {
  public static deepClone<Tp>(source: Tp): Tp {
      let cp: Tp;
      let ptn = 0;
      if (source === null) {
        cp = source;
      } else if (Array.isArray(source)) {
        cp = [] as any;
        (source as any[]).forEach((v, i, arr) => { (cp as any).push(v); });
        (cp as any).forEach((n: any) => {
          if ((typeof(n) === 'object' && n !== {}) || Array.isArray(n)) {
            n = DeepCloneUtil.deepClone<any>(n);
          }
        });
      } else if (typeof(source) === 'object') {
        cp = { ...(source as Object) } as Tp;
        Object.keys(cp).forEach(k => {
          if (typeof((cp as any)[k]) === 'object') {
            (cp as any)[k] = DeepCloneUtil.deepClone<any>((cp as any)[k]);
          }
        });
      } else {
        cp = source;
      }
      return cp;
  }
}
