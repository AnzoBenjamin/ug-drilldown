import * as shapefile from 'shapefile';

export async function readShapefile(shapefilePath) {
  try {
    const response = await shapefile.open(shapefilePath);
    const source = await response.read();
    const features = [];

    await response.read().then(function log(result) {
      if (result.done) return;
      features.push(result.value);
      return response.read().then(log);
    });

    return {
      type: 'FeatureCollection',
      features: features,
    };
  } catch (error) {
    console.error('Error reading shapefile:', error);
    throw error;
  }
}
