/**
 * Copyright 2020 Angus.Fenying <fenying@litert.org>
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

export interface IDomain {

    domain: string;

    tld: string;

    sld: string;

    sub: string;
}

export interface ITLDManager {

    /**
     * Validate if a domain is in legal format. (No validating TLD)
     *
     * @param domain The domain to be validated.
     */
    isDomain(domain: string): boolean;

    /**
     * Validate if a TLD is valid (registered in this manager).
     *
     * @param tld The TLD to be validated.
     */
    isTLD(tld: string): boolean;

    /**
     * Parse a domain and then validate the TLD.
     *
     * @param domain The domain to be parsed.
     */
    parse(domain: string): IDomain;

    /**
     * Import the valid TLD list into the system.
     *
     * @param tlds      The list of TLD to be imported
     * @param append    Append to current list. [Default: true]
     */
    importTLDs(tlds: string[], append?: boolean): void;
}
