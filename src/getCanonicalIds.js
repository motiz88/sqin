import Rx from 'rx';
import getCanonicalId from './getCanonicalId';

export default function getCanonicalIds(ids, base, resolvedCache)
{
    resolvedCache = resolvedCache || {};
    return Rx.Observable.from(ids)
        .flatMap(id => getCanonicalId(id, base, resolvedCache));
}

