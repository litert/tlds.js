/**
 * Copyright 2021 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

        if (tld.startsWith('.')) {

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
