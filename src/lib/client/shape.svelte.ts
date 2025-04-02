import {
	ShapeStream,
	Shape,
	type ShapeStreamOptions,
	type Row,
	FetchError
} from '@electric-sql/client';

export class Live<T extends Row> {
	rows: Row<T>[] = $state([]);

	#unsub: undefined | (() => void) = undefined;

	constructor(options: ShapeStreamOptions) {
		try {
			const stream = new ShapeStream<T>({
				onError: (error) => {
					// Handle all stream errors here
					if (error instanceof FetchError) {
						console.error('HTTP error:', error.status, error.message);
					} else {
						console.error('Stream error:', error);
					}
				},
				...options
			});
			const shape = new Shape<T>(stream);
			shape.rows.then((r) => {
				// console.log('then');
				// console.log(r);
				this.rows = r;
			});
			this.#unsub = shape.subscribe((d) => {
				// console.log('subscribe');
				// console.log(d);
				this.rows = d.rows;
			});
		} catch (error) {
			console.error('Error creating ShapeStream:', error);
		}
	}

	destructor() {
		this.#unsub?.();
	}
}

// export function useShape(options: ShapeStreamOptions) {
// 	const data = $state<{ rows: Row[] }>({ rows: [] });
// 	const stream = new ShapeStream(options);
// 	const shape = new Shape(stream);
// 	// shape.rows
// 	shape.rows.then((r) => {
// 		data.rows = r;
// 		console.log(r);
// 		console.log('then');
// 	});
// 	shape.subscribe((d) => {
// 		console.log(d);
// 		data.rows = d.rows;
// 	});
// 	return {
// 		// rows,
// 		get rows() {
// 			return data.rows;
// 		},

// 		shape
// 	};
// }
