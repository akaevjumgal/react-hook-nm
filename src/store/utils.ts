
export function update<S = {}>(previous: S, current: S): S {
	return Object.assign({}, previous, current)
}
