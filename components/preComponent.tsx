/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const preComponent = (props: React.HTMLAttributes<HTMLPreElement>) => {
    return (
        <>
            <pre className="mb-1 md:mb-7" {...props} />
            <div className="not-prose mb-7 md:hidden">
                コードビューは横スクロールできます。
            </div>
        </>
    )
}

export default preComponent
