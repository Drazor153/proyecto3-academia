import { OriginalData, TransformedData } from '../types/teachers';

export const transformarDatos = (input: OriginalData[]): TransformedData[] => {
  const datosTransformados: Map<string, TransformedData> = new Map();

  input.forEach((original) => {
    const {
      levelCode,
      level: { name: levelName },
      year,
      semester
    } = original;

    if (!datosTransformados.has(levelCode)) {
      datosTransformados.set(levelCode, { levelName, levelCode, years: [] });
    }

    const nivel = datosTransformados.get(levelCode)!;

    const añoExistente = nivel.years.find((item) => item.year === year);

    if (añoExistente) {
      añoExistente.semesters.push(semester);
    } else {
      nivel.years.push({ year, semesters: [semester] });
    }
  });

  return [...datosTransformados.values()];
};
