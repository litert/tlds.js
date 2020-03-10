import * as C from './Common';
import * as E from './Errors';

interface ITLDTree {

    [key: string]: boolean | ITLDTree;
}

const DOMAIN_REGEXP = /^(?!-)[-a-z0-9]{1,63}(?<!-)(\.(?!-)[-a-z0-9]{1,63}(?<!-)){1,}(?<!\.\d+)$/i;

class TLDManager implements C.ITLDManager {

    private _tlds: ITLDTree;

    public constructor() {

        this._tlds = {};
    }

    public isDomain(domain: string): boolean {

        return domain.length > 0 && domain.length < 255 && DOMAIN_REGEXP.test(domain);
    }

    public isTLD(tld: string): boolean {

        if (tld[0] === '.') {

            tld = `test${tld}`;
        }
        else {

            tld = `test.${tld}`;
        }

        try {

            return this.parse(tld).sld === 'test';
        }
        catch {

            return false;
        }
    }

    public parse(domain: string): C.IDomain {

        const segs = domain.toLowerCase().split('.');

        let tlds = [];
        let tmp = this._tlds;

        if (!segs[0]) {

            segs.shift();
        }

        if (segs.length < 2) {

            throw new E.E_INVALID_TLD();
        }

        for (let i = segs.length - 1; i >= 0; i--) {

            const x = segs[i];

            if (tmp[x]) {

                tlds.unshift(x);

                if (tmp[x] === true) {

                    break;
                }

                tmp = tmp[x] as ITLDTree;
            }
            else {

                break;
            }
        }

        if (!tlds.length) {

            throw new E.E_INVALID_TLD();
        }

        const tld = tlds.join('.');

        return {
            domain: segs.slice(-tlds.length - 1).join('.'),
            sld: segs[segs.length - tlds.length - 1],
            tld,
            sub: segs.slice(0, -tlds.length - 1).join('.') || '@'
        };
    }

    public importTLDs(newTLDs: string[], append: boolean = true): void {

        let tldTree = append ? this._tlds : {};

        for (const tld of newTLDs) {

            if (!tld) {

                continue;
            }

            let tmp = tldTree;

            let segs = tld.toLowerCase().split('.').reverse();

            if (!segs[segs.length - 1]) {

                segs = segs.slice(0, -1);
            }

            for (let i = 0; i < segs.length; i++) {

                const s = segs[i];

                if (tmp[s] === true && i + 1 < segs.length) {

                    tmp = tmp[s] = {};
                }
                else if (!tmp[s]) {

                    if (i + 1 < segs.length) {

                        tmp = tmp[s] = {};
                    }
                    else {

                        tmp[s] = true;
                        break;
                    }
                }
                else {

                    tmp = tmp[s] as ITLDTree;
                }
            }
        }

        this._tlds = tldTree;
    }
}

export function createTLDMananger(): C.ITLDManager {

    return new TLDManager();
}
