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
			console.log('Stream: ' + JSON.stringify(stream));
			const shape = new Shape<T>(stream);
			console.log('Shape: ' + JSON.stringify(shape));
			shape.rows.then((r) => {
				console.log('then');
				console.log(r);
				this.rows = r;
			});
			this.#unsub = shape.subscribe((d) => {
				console.log('subscribe');
				console.log(d.rows);
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
