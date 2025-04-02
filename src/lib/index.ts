
/**
 * Parses Extended Well-Known Binary (EWKB) hexadecimal representation
 * of a point geometry and extracts its coordinates.
 * 
 * This function handles both little-endian and big-endian formats and expects
 * a point geometry type. The returned coordinates are in the format [latitude, longitude].
 * 
 * @param wkbHex - Hexadecimal string representation of EWKB point data
 * @returns A tuple containing [latitude, longitude] coordinates
 * @throws {Error} If the EWKB does not represent a Point geometry
 * 
 * @example
 * const coords = parseEWKB("0101000020E6100000000000000000F03F0000000000000040");
 * // Returns [2, 1] (latitude, longitude)
 */
export function parseEWKB(wkbHex: string): [number, number] {
	// Convert hex string to an ArrayBuffer
	const buffer = new ArrayBuffer(wkbHex.length / 2);
	const view = new DataView(buffer);

	for (let i = 0; i < wkbHex.length; i += 2) {
		view.setUint8(i / 2, parseInt(wkbHex.substring(i, i + 2), 16));
	}

	// Read endianness (0 = big-endian, 1 = little-endian)
	const littleEndian = view.getUint8(0) === 1;

	// Read WKB type (should be 1 for a Point, but in EWKB it's 0x20000001)
	const type = littleEndian ? view.getUint32(1, true) : view.getUint32(1, false);
	if ((type & 0xffff) !== 1) throw new Error('Invalid EWKB: Not a Point');

	// Read SRID (located at byte 5)
	// const srid = littleEndian ? view.getUint32(5, true) : view.getUint32(5, false);

	// Read coordinates (double precision floating point, starting at byte 9)
	const longitude = littleEndian ? view.getFloat64(9, true) : view.getFloat64(9, false);
	const latitude = littleEndian ? view.getFloat64(17, true) : view.getFloat64(17, false);

	return [latitude, longitude] 
	// return { latitude, longitude, srid };
}
