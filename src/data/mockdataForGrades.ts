export interface Assignment {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    dueDate: string;
    assignatureId: number;
    competencies: number[];
    capacities: number[];
}

export interface StudentsTable {
    id: number;
    firstName: string;
    lastName: string;
    grades: {
        [key: number]: string;
    };
    averages: {
        [key: number]: string;
    }
}


export const studentsTable = [
    {
      id: 10023456,
      firstName: "Juan",
      lastName: "Pérez",
      grades: {
        1: "A", 2: "B", 3: "A", 4: "B", 5: "C", 6: "A", 7: "AD", 8: "B", 9: "B",
        10: "A", 11: "B", 12: "C", 13: "B", 14: "A", 15: "A", 16: "B", 17: "C", 18: "A",
        19: "A", 20: "B", 21: "B", 22: "C", 23: "A", 24: "A", 25: "B", 26: "B", 27: "A",
      },
      averages: {1: 'A', 2: 'AD', 3: 'C'}
    },
    {
      id: 10034567,
      firstName: "María",
      lastName: "López",
      grades: {
        1: "B", 2: "A", 3: "C", 4: "B", 5: "A", 6: "B", 7: "A", 8: "B", 9: "C",
        10: "C", 11: "B", 12: "A", 13: "C", 14: "A", 15: "A", 16: "B", 17: "B", 18: "A",
        19: "C", 20: "B", 21: "B", 22: "A", 23: "C", 24: "A", 25: "B", 26: "B", 27: "A",
      },
      averages: {1: 'B', 2: 'C', 3: 'C'}
    },
    {
      id: 10045678,
      firstName: "Carlos",
      lastName: "Sánchez",
      grades: {
        1: "C", 2: "C", 3: "B", 4: "A", 5: "B", 6: "C", 7: "B", 8: "AD", 9: "NA",
        10: "B", 11: "A", 12: "C", 13: "B", 14: "AD", 15: "A", 16: "B", 17: "C", 18: "B",
        19: "C", 20: "B", 21: "A", 22: "C", 23: "A", 24: "B", 25: "C", 26: "B", 27: "NA",
      },
        averages: {1: 'C', 2: 'A', 3: 'B'}
    },
    {
      id: 10056789,
      firstName: "Lucía",
      lastName: "Rodríguez",
      grades: {
        1: "AD", 2: "B", 3: "A", 4: "B", 5: "AD", 6: "NA", 7: "B", 8: "A", 9: "B",
        10: "C", 11: "A", 12: "B", 13: "A", 14: "C", 15: "B", 16: "A", 17: "B", 18: "C",
        19: "B", 20: "A", 21: "C", 22: "B", 23: "A", 24: "AD", 25: "B", 26: "B", 27: "NA",
      },
        averages: {1: 'AD', 2: 'B', 3: 'C'}
    },
    {
      id: 10067890,
      firstName: "Pedro",
      lastName: "Gómez",
      grades: {
        1: "NA", 2: "B", 3: "C", 4: "A", 5: "B", 6: "NA", 7: "NA", 8: "NA", 9: "NA",
        10: "A", 11: "B", 12: "C", 13: "A", 14: "B", 15: "NA", 16: "C", 17: "A", 18: "B",
        19: "C", 20: "B", 21: "A", 22: "B", 23: "NA", 24: "C", 25: "B", 26: "B", 27: "NA",
      },
        averages: {1: 'A', 2: 'B', 3: 'C'}
    },
    {
      id: 10078901,
      firstName: "Ana",
      lastName: "Martínez",
      grades: {
        1: "B", 2: "C", 3: "A", 4: "B", 5: "C", 6: "B", 7: "A", 8: "C", 9: "A",
        10: "A", 11: "B", 12: "C", 13: "A", 14: "C", 15: "B", 16: "A", 17: "B", 18: "B",
        19: "B", 20: "C", 21: "A", 22: "B", 23: "C", 24: "B", 25: "B", 26: "B", 27: "A",
      },
        averages: {1: 'B', 2: 'C', 3: 'A'}
    },
    {
      id: 10089012,
      firstName: "Javier",
      lastName: "Díaz",
      grades: {
        1: "A", 2: "B", 3: "A", 4: "AD", 5: "C", 6: "B", 7: "NA", 8: "NA", 9: "NA",
        10: "A", 11: "C", 12: "B", 13: "B", 14: "A", 15: "B", 16: "B", 17: "C", 18: "A",
        19: "A", 20: "C", 21: "B", 22: "A", 23: "B", 24: "A", 25: "B", 26: "B", 27: "C",
      },
        averages: {1: 'A', 2: 'B', 3: 'C'}
    },
    {
        id: 10090123,
        firstName: "Elena",
        lastName: "Fernández",
        grades: {
          1: "C", 2: "A", 3: "B", 4: "C", 5: "A", 6: "B", 7: "C", 8: "A", 9: "B",
          10: "C", 11: "A", 12: "B", 13: "C", 14: "A", 15: "B", 16: "C", 17: "A", 18: "B",
          19: "C", 20: "A", 21: "B", 22: "C", 23: "A", 24: "B", 25: "C", 26: "A", 27: "B",
        },
        averages: {1: 'C', 2: 'A', 3: 'B'}
    },
    {
        id: 10101234,
        firstName: "Sofía",
        lastName: "Ramírez",
        grades: {
          1: "NA", 2: "B", 3: "C", 4: "A", 5: "B", 6: "NA", 7: "NA", 8: "NA", 9: "NA",
          10: "A", 11: "B", 12: "C", 13: "A", 14: "B", 15: "NA", 16: "C", 17: "A", 18: "B",
          19: "C", 20: "B", 21: "A", 22: "B", 23: "NA", 24: "C", 25: "B", 26: "B", 27: "NA",
        },
        averages: {1: 'A', 2: 'B', 3: 'C'}
    },
    {
        id: 10112345,
        firstName: "Hugo",
        lastName: "Torres",
        grades: {
          1: "B", 2: "A", 3: "B", 4: "C", 5: "B", 6: "C", 7: "A", 8: "B", 9: "AD",
          10: "A", 11: "B", 12: "C", 13: "B", 14: "A", 15: "C", 16: "B", 17: "A", 18: "B",
          19: "B", 20: "C", 21: "A", 22: "B", 23: "C", 24: "B", 25: "B", 26: "A", 27: "B",
        },
        averages: {1: 'B', 2: 'A', 3: 'C'}
    },
    {
        id: 10123456,
        firstName: "Isabel",
        lastName: "Vega",
        grades: {
          1: "NA", 2: "B", 3: "C", 4: "A", 5: "B", 6: "NA", 7: "NA", 8: "NA", 9: "NA",
          10: "A", 11: "B", 12: "C", 13: "A", 14: "B", 15: "NA", 16: "C", 17: "A", 18: "B",
          19: "C", 20: "B", 21: "A", 22: "B", 23: "NA", 24: "C", 25: "B", 26: "B", 27: "NA",
        },
        averages: {1: 'A', 2: 'B', 3: 'C'}
    },
    {
        id: 10134567,
        firstName: "Fernando",
        lastName: "Navarro",
        grades: {
          1: "B", 2: "A", 3: "B", 4: "C", 5: "B", 6: "C", 7: "A", 8: "B", 9: "AD",
          10: "A", 11: "B", 12: "C", 13: "B", 14: "A", 15: "C", 16: "B", 17: "A", 18: "B",
          19: "B", 20: "C", 21: "A", 22: "B", 23: "C", 24: "B", 25: "B", 26: "A", 27: "B",
        },
        averages: {1: 'B', 2: 'A', 3: 'C'}
    },
    {
        id: 10145678,
        firstName: "Valentina",
        lastName: "Ruiz",
        grades: {
          1: "NA", 2: "B", 3: "C", 4: "A", 5: "B", 6: "NA", 7: "NA", 8: "NA", 9: "NA",
          10: "A", 11: "B", 12: "C", 13: "A", 14: "B", 15: "NA", 16: "C", 17: "A", 18: "B",
          19: "C", 20: "B", 21: "A", 22: "B", 23: "NA", 24: "C", 25: "B", 26: "B", 27: "NA",
        },
        averages: {1: 'A', 2: 'B', 3: 'C'}
    },
    {
        id: 10156789,
        firstName: "Diego",
        lastName: "Castro",
        grades: {
          1: "B", 2: "A", 3: "B", 4: "C", 5: "B", 6: "C", 7: "A", 8: "B", 9: "AD",
          10: "A", 11: "B", 12: "C", 13: "B", 14: "A", 15: "C", 16: "B", 17: "A", 18: "B",
          19: "B", 20: "C", 21: "A", 22: "B", 23: "C", 24: "B", 25: "B", 26: "A", 27: "B",
        },
        averages: {1: 'B', 2: 'A', 3: 'C'}
    },
    {
        id: 10167890,
        firstName: "Camila",
        lastName: "Herrera",
        grades: {
          1: "NA", 2: "B", 3: "C", 4: "A", 5: "B", 6: "NA", 7: "NA", 8: "NA", 9: "NA",
          10: "A", 11: "B", 12: "C", 13: "A", 14: "B", 15: "NA", 16: "C", 17: "A", 18: "B",
          19: "C", 20: "B", 21: "A", 22: "B", 23: "NA", 24: "C", 25: "B", 26: "B", 27: "NA",
        },
        averages: {1: 'A', 2: 'B', 3: 'C'}
    }
  ];
  

export const students = [
    { id: 10023456, firstName: "Juan", lastName: "Pérez", grade: "A" },
    { id: 10034567, firstName: "María", lastName: "López", grade: "B" },
    { id: 10045678, firstName: "Carlos", lastName: "Sánchez", grade: "C" },
    { id: 10056789, firstName: "Lucía", lastName: "Rodríguez", grade: "AD" },
    { id: 10067890, firstName: "Pedro", lastName: "Gómez", grade: "NA" },
    { id: 10078901, firstName: "Ana", lastName: "Martínez", grade: "B" },
    { id: 10089012, firstName: "Javier", lastName: "Díaz", grade: "A" },
    { id: 10090123, firstName: "Elena", lastName: "Fernández", grade: "C" },
    { id: 10101234, firstName: "Sofía", lastName: "Ramírez", grade: "NA" },
    { id: 10112345, firstName: "Hugo", lastName: "Torres", grade: "AD" },
    { id: 10123456, firstName: "Isabel", lastName: "Vega", grade: "B" },
    { id: 10134567, firstName: "Fernando", lastName: "Navarro", grade: "NA" },
    { id: 10145678, firstName: "Valentina", lastName: "Ruiz", grade: "C" },
    { id: 10156789, firstName: "Diego", lastName: "Castro", grade: "A" },
    { id: 10167890, firstName: "Camila", lastName: "Herrera", grade: "B" },
];

// export const assignments = [
//     // 📐 Geometría
//     { id: 1, name: "Tarea de Triángulos", description: "Resolver problemas sobre la clasificación de triángulos y el Teorema de Pitágoras.", dueDate: "2025-02-20", assignatureId: 1, categoryId: 1 },
//     { id: 2, name: "Proyecto: Construcción de Figuras", description: "Crear modelos físicos de figuras geométricas y calcular sus áreas y volúmenes.", dueDate: "2025-03-05", assignatureId: 1, categoryId: 4 },
//     { id: 3, name: "Examen de Ángulos y Polígonos", description: "Evaluación sobre los diferentes tipos de ángulos, polígonos y sus propiedades.", dueDate: "2025-02-28", assignatureId: 1, categoryId: 2 },
//     { id: 4, name: "Investigación sobre Círculos", description: "Análisis del área y circunferencia de los círculos.", dueDate: "2025-03-10", assignatureId: 1, categoryId: 6 },
//     { id: 5, name: "Tarea de Perímetros", description: "Ejercicios sobre cálculo de perímetros de diferentes figuras.", dueDate: "2025-03-15", assignatureId: 1, categoryId: 1 },
//     { id: 6, name: "Proyecto: Formas en la Naturaleza", description: "Identificar figuras geométricas en el entorno.", dueDate: "2025-03-22", assignatureId: 1, categoryId: 4 },
//     { id: 7, name: "Examen sobre Volúmenes", description: "Cálculo de volúmenes de cuerpos geométricos.", dueDate: "2025-03-28", assignatureId: 1, categoryId: 2 },
//     { id: 8, name: "Trabajo en equipo: Figuras 3D", description: "Crear maquetas de sólidos geométricos.", dueDate: "2025-04-05", assignatureId: 1, categoryId: 4 },
//     { id: 9, name: "Tarea sobre Simetría", description: "Ejercicios sobre líneas de simetría en figuras.", dueDate: "2025-04-12", assignatureId: 1, categoryId: 1 },
  
//     // 🔢 Aritmética
//     { id: 10, name: "Tarea de Fracciones", description: "Resolver ejercicios sobre suma, resta, multiplicación y división de fracciones.", dueDate: "2025-02-18", assignatureId: 2, categoryId: 1 },
//     { id: 11, name: "Proyecto: Mercado Financiero", description: "Analizar datos de precios y aplicar porcentajes.", dueDate: "2025-03-10", assignatureId: 2, categoryId: 4 },
//     { id: 12, name: "Examen de Números Decimales", description: "Prueba sobre operaciones con decimales y fracciones.", dueDate: "2025-02-25", assignatureId: 2, categoryId: 2 },
//     { id: 13, name: "Investigación sobre Proporciones", description: "Cómo se aplican las proporciones en la vida diaria.", dueDate: "2025-03-14", assignatureId: 2, categoryId: 6 },
//     { id: 14, name: "Tarea de Porcentajes", description: "Cálculo de descuentos e impuestos en productos.", dueDate: "2025-03-22", assignatureId: 2, categoryId: 1 },
//     { id: 15, name: "Proyecto: Matemáticas en la Cocina", description: "Aplicar medidas y fracciones en recetas.", dueDate: "2025-03-30", assignatureId: 2, categoryId: 4 },
//     { id: 16, name: "Examen de Regla de Tres", description: "Prueba sobre proporciones directas e inversas.", dueDate: "2025-04-07", assignatureId: 2, categoryId: 2 },
//     { id: 17, name: "Tarea sobre Operaciones Básicas", description: "Ejercicios combinados de suma, resta, multiplicación y división.", dueDate: "2025-04-14", assignatureId: 2, categoryId: 1 },
//     { id: 18, name: "Desafío Matemático", description: "Resolver problemas de lógica numérica.", dueDate: "2025-04-20", assignatureId: 2, categoryId: 3 },
  
//     // 📖 Álgebra
//     { id: 19, name: "Tarea de Ecuaciones Lineales", description: "Resolver ecuaciones de primer grado.", dueDate: "2025-02-22", assignatureId: 3, categoryId: 1 },
//     { id: 20, name: "Investigación: Álgebra en la Vida Real", description: "Cómo se aplica el álgebra en profesiones.", dueDate: "2025-03-12", assignatureId: 3, categoryId: 6 },
//     { id: 21, name: "Examen de Expresiones Algebraicas", description: "Evaluación sobre simplificación de expresiones.", dueDate: "2025-03-01", assignatureId: 3, categoryId: 2 },
//     { id: 22, name: "Proyecto: Modelos Algebraicos", description: "Crear modelos físicos que representen ecuaciones.", dueDate: "2025-03-18", assignatureId: 3, categoryId: 4 },
//     { id: 23, name: "Tarea sobre Propiedades Algebraicas", description: "Ejercicios sobre distribución, asociatividad y conmutatividad.", dueDate: "2025-03-26", assignatureId: 3, categoryId: 1 },
//     { id: 24, name: "Investigación sobre Álgebra y Computación", description: "Cómo se usa el álgebra en la programación.", dueDate: "2025-04-02", assignatureId: 3, categoryId: 6 },
//     { id: 25, name: "Examen sobre Factores Comunes", description: "Evaluación sobre factorización de polinomios.", dueDate: "2025-04-10", assignatureId: 3, categoryId: 2 },
//     { id: 26, name: "Tarea sobre Resolución de Sistemas", description: "Ejercicios de sistemas de ecuaciones.", dueDate: "2025-04-18", assignatureId: 3, categoryId: 1 },
//     { id: 27, name: "Proyecto Final: Aplicaciones del Álgebra", description: "Estudio de casos reales en los que se aplica el álgebra.", dueDate: "2025-04-25", assignatureId: 3, categoryId: 4 },
//   ];

export const assignments = [
    // 📐 Geometría
    { id: 1, name: "Tarea de Triángulos", description: "Resolver problemas sobre la clasificación de triángulos y el Teorema de Pitágoras.", dueDate: "2025-01-20", assignatureId: 1, categoryId: 1, competencies: [23, 21], capacities: [79, 80] },
    { id: 2, name: "Proyecto: Construcción de Figuras", description: "Crear modelos físicos de figuras geométricas y calcular sus áreas y volúmenes.", dueDate: "2025-02-05", assignatureId: 1, categoryId: 4, competencies: [23, 22], capacities: [81, 82] },
    { id: 3, name: "Examen de Ángulos y Polígonos", description: "Evaluación sobre los diferentes tipos de ángulos, polígonos y sus propiedades.", dueDate: "2025-02-28", assignatureId: 1, categoryId: 2, competencies: [23], capacities: [80, 81] },
    { id: 4, name: "Investigación sobre Círculos", description: "Análisis del área y circunferencia de los círculos.", dueDate: "2025-03-10", assignatureId: 1, categoryId: 6, competencies: [23], capacities: [81, 82] },
    { id: 5, name: "Tarea de Perímetros", description: "Ejercicios sobre cálculo de perímetros de diferentes figuras.", dueDate: "2025-03-15", assignatureId: 1, categoryId: 1, competencies: [23], capacities: [79] },
    { id: 6, name: "Proyecto: Formas en la Naturaleza", description: "Identificar figuras geométricas en el entorno.", dueDate: "2025-03-22", assignatureId: 1, categoryId: 4, competencies: [23], capacities: [81] },
    { id: 7, name: "Examen sobre Volúmenes", description: "Cálculo de volúmenes de cuerpos geométricos.", dueDate: "2025-03-28", assignatureId: 1, categoryId: 2, competencies: [23], capacities: [82] },
    { id: 8, name: "Trabajo en equipo: Figuras 3D", description: "Crear maquetas de sólidos geométricos.", dueDate: "2025-04-05", assignatureId: 1, categoryId: 4, competencies: [23], capacities: [81] },
    { id: 9, name: "Tarea sobre Simetría", description: "Ejercicios sobre líneas de simetría en figuras.", dueDate: "2025-04-12", assignatureId: 1, categoryId: 1, competencies: [23], capacities: [79] },
  
    // 🔢 Aritmética
    { id: 10, name: "Tarea de Fracciones", description: "Resolver ejercicios sobre suma, resta, multiplicación y división de fracciones.", dueDate: "2025-02-18", assignatureId: 2, categoryId: 1, competencies: [21], capacities: [79, 80] },
    { id: 11, name: "Proyecto: Mercado Financiero", description: "Analizar datos de precios y aplicar porcentajes.", dueDate: "2025-03-10", assignatureId: 2, categoryId: 4, competencies: [24], capacities: [81, 82] },
    { id: 12, name: "Examen de Números Decimales", description: "Prueba sobre operaciones con decimales y fracciones.", dueDate: "2025-02-25", assignatureId: 2, categoryId: 2, competencies: [21], capacities: [80, 81] },
    { id: 13, name: "Investigación sobre Proporciones", description: "Cómo se aplican las proporciones en la vida diaria.", dueDate: "2025-03-14", assignatureId: 2, categoryId: 6, competencies: [22], capacities: [81, 82] },
    { id: 14, name: "Tarea de Porcentajes", description: "Cálculo de descuentos e impuestos en productos.", dueDate: "2025-03-22", assignatureId: 2, categoryId: 1, competencies: [24], capacities: [79, 80] },
    { id: 15, name: "Proyecto: Matemáticas en la Cocina", description: "Aplicar medidas y fracciones en recetas.", dueDate: "2025-03-30", assignatureId: 2, categoryId: 4, competencies: [21], capacities: [81, 82] },
    { id: 16, name: "Examen de Regla de Tres", description: "Prueba sobre proporciones directas e inversas.", dueDate: "2025-04-07", assignatureId: 2, categoryId: 2, competencies: [22], capacities: [80, 81] },
    { id: 17, name: "Tarea sobre Operaciones Básicas", description: "Ejercicios combinados de suma, resta, multiplicación y división.", dueDate: "2025-04-14", assignatureId: 2, categoryId: 1, competencies: [21], capacities: [79] },
    { id: 18, name: "Desafío Matemático", description: "Resolver problemas de lógica numérica.", dueDate: "2025-04-20", assignatureId: 2, categoryId: 3, competencies: [22], capacities: [80, 81] },
  
    // 📖 Álgebra
    { id: 19, name: "Tarea de Ecuaciones Lineales", description: "Resolver ecuaciones de primer grado.", dueDate: "2025-02-22", assignatureId: 3, categoryId: 1, competencies: [22], capacities: [79, 80] },
    { id: 20, name: "Investigación: Álgebra en la Vida Real", description: "Cómo se aplica el álgebra en profesiones.", dueDate: "2025-03-12", assignatureId: 3, categoryId: 6, competencies: [22], capacities: [81, 82] },
    { id: 21, name: "Examen de Expresiones Algebraicas", description: "Evaluación sobre simplificación de expresiones.", dueDate: "2025-03-01", assignatureId: 3, categoryId: 2, competencies: [22], capacities: [80, 81] },
    { id: 22, name: "Proyecto: Modelos Algebraicos", description: "Crear modelos físicos que representen ecuaciones.", dueDate: "2025-03-18", assignatureId: 3, categoryId: 4, competencies: [22], capacities: [81, 82] },
    { id: 23, name: "Tarea sobre Propiedades Algebraicas", description: "Ejercicios sobre distribución, asociatividad y conmutatividad.", dueDate: "2025-03-26", assignatureId: 3, categoryId: 1, competencies: [22], capacities: [79] },
    { id: 24, name: "Investigación sobre Álgebra y Computación", description: "Cómo se usa el álgebra en la programación.", dueDate: "2025-04-02", assignatureId: 3, categoryId: 6, competencies: [22], capacities: [81, 82] },
    { id: 25, name: "Examen sobre Factores Comunes", description: "Evaluación sobre factorización de polinomios.", dueDate: "2025-04-10", assignatureId: 3, categoryId: 2, competencies: [22], capacities: [80, 81] },
    { id: 26, name: "Tarea sobre Resolución de Sistemas", description: "Ejercicios de sistemas de ecuaciones.", dueDate: "2025-04-18", assignatureId: 3, categoryId: 1, competencies: [22], capacities: [79] },
    { id: 27, name: "Proyecto Final: Aplicaciones del Álgebra", description: "Estudio de casos reales en los que se aplica el álgebra.", dueDate: "2025-04-25", assignatureId: 3, categoryId: 4, competencies: [22], capacities: [81, 82] },
  ];

  
  

export const categories = [
    {
        id: '1',
        name: 'Tarea',
        weight: 0.2,
    },
    {
        id: '2',
        name: 'Examen',
        weight: 0.4,
    },
    {
        id: '3',
        name: 'Participación',
        weight: 0.1,
    },
    {
        id: '4',
        name: 'Proyecto',
        weight: 0.2,
    },
    {
        id: '6',
        name: 'Otro',
        weight: 0.1,
    },
]

export const areas = [

    {
        id: 1,
        title: "Desarollo personal y ciudadanía cívica"
    },
    {
        id:2,
        title: "Ciencias Sociales"
    },
    {
        id:3,
        title: "Educación para el trabajo"
    },
    {
        id:4,
        title: "Educación física"
    },
    {
        id:5,
        title: "Comunicación"
    },
    {
        id:6,
        title: "Arte y cultura"
    },
    {
        id:7,
        title: "Castellano como segunda lengua"
    },
    {
        id:8,
        title: "Inglés como segunda lengua"
    },
    {
        id:9,
        title: "Matemática"
    },
    {
        id:10,
        title: "Ciencia y tecnología"
    },
    {
        id:11,
        title: "Educación religiosa"
    }
]

export const competencies = [
    {
        "id": 1,
        "title": "Construye su identidad.",
        "area": 1
    },
    {
        "id": 2,
        "title": "Convive y participa democráticamente en la búsqueda del bien común.",
        "area": 1
    },
    {
        "id": 3,
        "title": "Construye interpretaciones históricas.",
        "area": 2
    },
    {
        "id": 4,
        "title": "Gestiona responsablemente el espacio y el ambiente.",
        "area": 2
    },
    {
        "id": 5,
        "title": "Gestiona responsablemente los recursos económicos",
        "area": 2
    },
    {
        "id": 6,
        "title": "Gestiona proyectos de emprendimiento económico o social.",
        "area": 3
    },
    {
        "id": 7,
        "title": "Se desenvuelve de manera autónoma a través de su motricidad.",
        "area": 4
    },
    {
        "id": 8,
        "title": "Asume una vida saludable.",
        "area": 4
    },
    {
        "id": 9,
        "title": "Interactúa a través de sus habilidades sociomotrices.",
        "area": 4
    },
    {
        "id": 10,
        "title": "Se comunica oralmente en su lengua materna.",
        "area": 5
    },
    {
        "id": 11,
        "title": "Lee diversos tipos de textos escritos en lengua materna.",
        "area": 5
    },
    {
        "id": 12,
        "title": "Escribe diversos tipos de textos en lengua materna.",
        "area": 5
    },
    {
        "id": 13,
        "title": "Aprecia de manera crítica manifestaciones artístico-culturales.",
        "area": 6
    },
    {
        "id": 14,
        "title": "Crea proyectos desde los lenguajes artísticos.",
        "area": 6
    },
    {
        "id": 15,
        "title": "Se comunica oralmente en castellano como segunda lengua.",
        "area": 7
    },
    {
        "id": 16,
        "title": "Lee diversos tipos de textos escritos en castellano como segunda lengua.",
        "area": 7
    },
    {
        "id": 17,
        "title": "Escribe diversos tipos de textos en castellano como segunda lengua.",
        "area": 7
    },
    {
        "id": 18,
        "title": "Se comunica oralmente en inglés como lengua extranjera",
        "area": 8
    },
    {
        "id": 19,
        "title": "Lee diversos tipos de textos escritos en inglés como lengua extranjera.",
        "area": 8
    },
    {
        "id": 20,
        "title": "Escribe diversos tipos de textos en inglés como lengua extranjera.",
        "area": 8
    },
    {
        "id": 21,
        "title": "Resuelve problemas de cantidad.",
        "area": 9
    },
    {
        "id": 22,
        "title": "Resuelve problemas de regularidad, equivalencia y cambio.",
        "area": 9
    },
    {
        "id": 23,
        "title": "Resuelve problemas de forma, movimiento y localización.",
        "area": 9
    },
    {
        "id": 24,
        "title": "Resuelve problemas de gestión de datos e incertidumbre.",
        "area": 9
    },
    {
        "id": 25,
        "title": "Indaga mediante métodos científicos para construir conocimientos.",
        "area": 10
    },
    {
        "id": 26,
        "title": "Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo.",
        "area": 10
    },
    {
        "id": 27,
        "title": "Diseña y construye soluciones tecnológicas para resolver problemas de su entorno.",
        "area": 10
    },
    {
        "id": 28,
        "title": "a Construye su identidad como persona humana, amada por Dios, digna, libre y trascendente, comprendiendo la doctrina de su propia religión, abierto al diálogo con las que le son cercanas.",
        "area": 11
    },
    {
        "id": 29,
        "title": "Asume la experiencia del encuentro personal y comunitario con Dios en su proyecto de vida en coherencia con su creencia religiosa.",
        "area": 11
    },
    {
        "id": 30,
        "title": "Gestiona su aprendizaje de manera autónoma.",
        "area": 12
    },
    {
        "id": 31,
        "title": "Se desenvuelve en entornos virtuales generados por las TIC.",
        "area": 12
    },
    {
        "id": 32,
        "title": "Mostar todas las actividades.",
        "area": 99
    },
]

export const capacities = [
    {
        "id": 1,
        "title": "Se valora a sí mismo",
        "competence": 1
    },
    {
        "id": 2,
        "title": "Autorregula sus emociones",
        "competence": 1
    },
    {
        "id": 3,
        "title": "Reflexiona y argumenta éticamente",
        "competence": 1
    },
    {
        "id": 4,
        "title": "Vive su sexualidad de manera integral y responsable de acuerdo a su etapa de desarrollo y madurez.",
        "competence": 1
    },
    {
        "id": 55,
        "title": "Interactúa con todas las personas",
        "competence": 2
    },
    {
        "id": 56,
        "title": "Construye y asume acuerdos y Normas",
        "competence": 2
    },
    {
        "id": 57,
        "title": "Maneja conflictos de manera constructiva",
        "competence": 2
    },
    {
        "id": 58,
        "title": "Delibera sobre asuntos públicos",
        "competence": 2
    },
    {
        "id": 59,
        "title": "Participa en acciones que promueven el bienestar común",
        "competence": 2
    },
    {
        "id": 60,
        "title": "Interpreta críticamente fuentes diversas",
        "competence": 3
    },
    {
        "id": 61,
        "title": "Comprende el tiempo histórico",
        "competence": 3
    },
    {
        "id": 62,
        "title": "Explica y argumenta procesos históricos",
        "competence": 3
    },
    {
        "id": 63,
        "title": "Comprende las relaciones entre los elementos naturales y sociales",
        "competence": 4
    },
    {
        "id": 64,
        "title": "Maneja fuentes de información para comprender el espacio geográfico y el ambiente",
        "competence": 4
    },
    {
        "id": 65,
        "title": "Genera acciones para preservar el ambiente local y global",
        "competence": 4
    },
    {
        "id": 66,
        "title": "Comprende las relaciones entre los elementos del sistema económico y financiero",
        "competence": 5
    },
    {
        "id": 67,
        "title": "Toma decisiones económicas y financieras",
        "competence": 5
    },
    {
        "id": 95,
        "title": "Crea propuestas de valor",
        "competence": 6
    },
    {
        "id": 96,
        "title": "Trabaja cooperativamente para lograr objetivos y metas",
        "competence": 6
    },
    {
        "id": 97,
        "title": "Aplica habilidades técnicas",
        "competence": 6
    },
    {
        "id": 98,
        "title": "Evalúa los resultados del proyecto de emprendimiento",
        "competence": 6
    },
    {
        "id": 5,
        "title": "Comprende su cuerpo",
        "competence": 7
    },
    {
        "id": 6,
        "title": "Se expresa corporalmente",
        "competence": 7
    },
    {
        "id": 7,
        "title": "Incorpora prácticas que mejoran su calidad de vida",
        "competence": 8
    },
    {
        "id": 8,
        "title": "Se relaciona utilizando sus habilidades sociomotrices",
        "competence": 9
    },
    {
        "id": 9,
        "title": "Crea y aplica estrategias y tácticas de juego",
        "competence": 9
    },
    {
        "id": 30,
        "title": "Obtiene información de textos orales",
        "competence": 10
    },
    {
        "id": 32,
        "title": "Infiere e interpreta información de textos orales",
        "competence": 10
    },
    {
        "id": 33,
        "title": "Adecúa, organiza y desarrolla las ideas de forma coherente y cohesionada",
        "competence": 10
    },
    {
        "id": 36,
        "title": "Utiliza recursos No verbales y paraverbales de forma estratégica",
        "competence": 10
    },
    {
        "id": 37,
        "title": "Interactúa estratégicamente con distintos interlocutores",
        "competence": 10
    },
    {
        "id": 40,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto oral",
        "competence": 10
    },
    {
        "id": 41,
        "title": "Obtiene información del texto escrito",
        "competence": 11
    },
    {
        "id": 44,
        "title": "Infiere e interpreta información del texto",
        "competence": 11
    },
    {
        "id": 45,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto escrito",
        "competence": 11
    },
    {
        "id": 48,
        "title": "Adecúa el texto a la situación comunicativa",
        "competence": 12
    },
    {
        "id": 49,
        "title": "Organiza y desarrolla las ideas de forma coherente y cohesionada",
        "competence": 12
    },
    {
        "id": 52,
        "title": "Utiliza convenciones del lenguaje escrito de forma pertinente",
        "competence": 12
    },
    {
        "id": 53,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto escrito",
        "competence": 12
    },
    {
        "id": 10,
        "title": "Percibe manifestaciones artístico-culturales",
        "competence": 13
    },
    {
        "id": 11,
        "title": "Contextualiza las manifestaciones artístico-culturales",
        "competence": 13
    },
    {
        "id": 12,
        "title": "Reflexiona creativa y críticamente sobre las manifestaciones artístico- culturales",
        "competence": 13
    },
    {
        "id": 13,
        "title": "Explora y experimenta los lenguajes de las artes",
        "competence": 14
    },
    {
        "id": 14,
        "title": "Aplica procesos de creación",
        "competence": 14
    },
    {
        "id": 15,
        "title": "Evalúa y comunica sus procesos y proyectos",
        "competence": 14
    },
    {
        "id": 16,
        "title": "Obtiene información de textos orales",
        "competence": 15
    },
    {
        "id": 17,
        "title": "Infiere e interpreta información de textos orales",
        "competence": 15
    },
    {
        "id": 18,
        "title": "Adecua, organiza y desarrolla las ideas de forma coherente y cohesionada",
        "competence": 15
    },
    {
        "id": 19,
        "title": "Utiliza recursos No verbales y paraverbales de forma estratégica",
        "competence": 15
    },
    {
        "id": 20,
        "title": "Interactúa estratégicamente con distintos interlocutores",
        "competence": 15
    },
    {
        "id": 21,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto oral",
        "competence": 15
    },
    {
        "id": 22,
        "title": "Obtiene información del texto escrito",
        "competence": 16
    },
    {
        "id": 23,
        "title": "Infiere e interpreta información del texto",
        "competence": 16
    },
    {
        "id": 24,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto escrito",
        "competence": 16
    },
    {
        "id": 25,
        "title": "Adecúa el texto a la Situación comunicativa",
        "competence": 17
    },
    {
        "id": 26,
        "title": "Organiza y desarrolla las ideas de forma coherente y cohesionada",
        "competence": 17
    },
    {
        "id": 27,
        "title": "Utiliza convenciones del lenguaje escrito de forma pertinente",
        "competence": 17
    },
    {
        "id": 28,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto escrito",
        "competence": 17
    },
    {
        "id": 29,
        "title": "Obtiene información de textos orales",
        "competence": 18
    },
    {
        "id": 31,
        "title": "Infiere e interpreta información de textos orales",
        "competence": 18
    },
    {
        "id": 34,
        "title": "Adecúa, organiza y desarrolla las ideas de forma coherente y cohesionada",
        "competence": 18
    },
    {
        "id": 35,
        "title": "Utiliza recursos No verbales y paraverbales de forma estratégica",
        "competence": 18
    },
    {
        "id": 38,
        "title": "Interactúa estratégicamente con distintos interlocutores",
        "competence": 18
    },
    {
        "id": 39,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto oral",
        "competence": 18
    },
    {
        "id": 42,
        "title": "Obtiene información del texto escrito",
        "competence": 19
    },
    {
        "id": 43,
        "title": "Infiere e interpreta información del texto",
        "competence": 19
    },
    {
        "id": 46,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto escrito",
        "competence": 19
    },
    {
        "id": 47,
        "title": "Adecúa el texto a la situación comunicativa",
        "competence": 20
    },
    {
        "id": 50,
        "title": "Organiza y desarrolla las ideas de forma coherente y cohesionada",
        "competence": 20
    },
    {
        "id": 51,
        "title": "Utiliza convenciones del lenguaje escrito de forma pertinente",
        "competence": 20
    },
    {
        "id": 54,
        "title": "Reflexiona y evalúa la forma, el contenido y el contexto del texto escrito",
        "competence": 20
    },
    {
        "id": 79,
        "title": "Traduce cantidades a expresiones numéricas",
        "competence": 21
    },
    {
        "id": 80,
        "title": "Comunica su comprensión sobre los números y las operaciones",
        "competence": 21
    },
    {
        "id": 81,
        "title": "Usa estrategias y procedimientos de estimación y cálculo",
        "competence": 21
    },
    {
        "id": 82,
        "title": "Argumenta afirmaciones sobre las relaciones numéricas y las operaciones",
        "competence": 21
    },
    {
        "id": 83,
        "title": "Traduce datos y condiciones a expresiones algebraicas",
        "competence": 22
    },
    {
        "id": 84,
        "title": "Comunica su comprensión sobre las relaciones algebraicas",
        "competence": 22
    },
    {
        "id": 85,
        "title": "Usa estrategias y procedimientos para encontrar reglas generales",
        "competence": 22
    },
    {
        "id": 86,
        "title": "Argumenta afirmaciones sobre relaciones de cambio y equivalencia",
        "competence": 22
    },
    {
        "id": 91,
        "title": "Modela objetos con formas geométricas y sus transformaciones",
        "competence": 23
    },
    {
        "id": 92,
        "title": "Comunica su comprensión sobre las formas y relaciones geométricas",
        "competence": 23
    },
    {
        "id": 93,
        "title": "Usa estrategias y procedimientos para orientarse en el espacio",
        "competence": 23
    },
    {
        "id": 94,
        "title": "Argumenta afirmaciones sobre relaciones geométricas",
        "competence": 23
    },
    {
        "id": 87,
        "title": "Representa datos con gráficos y medidas estadísticas o probabilísticas",
        "competence": 24
    },
    {
        "id": 88,
        "title": "Comunica la comprensión de los conceptos estadísticos y probabilísticos",
        "competence": 24
    },
    {
        "id": 89,
        "title": "Usa estrategias y procedimientos para recopilar y procesar datos",
        "competence": 24
    },
    {
        "id": 90,
        "title": "Sustenta conclusiones o decisiones basado en información obtenida",
        "competence": 24
    },
    {
        "id": 68,
        "title": "Problematiza situaciones",
        "competence": 25
    },
    {
        "id": 69,
        "title": "Diseña estrategias para hacer indagación",
        "competence": 25
    },
    {
        "id": 70,
        "title": "Genera y registra datos e información",
        "competence": 25
    },
    {
        "id": 71,
        "title": "Analiza datos e información",
        "competence": 25
    },
    {
        "id": 72,
        "title": "Evalúa y comunica el proceso y los resultados de su indagación",
        "competence": 25
    },
    {
        "id": 73,
        "title": "Comprende y usa conocimientos sobre los seres vivos; materia y energía; biodiversidad, Tierra y universo",
        "competence": 26
    },
    {
        "id": 74,
        "title": "Evalúa las implicancias del saber y del quehacer científico y tecnológico",
        "competence": 26
    },
    {
        "id": 75,
        "title": "Determina una alternativa de solución tecnológica",
        "competence": 27
    },
    {
        "id": 76,
        "title": "Diseña la alternativa de solución tecnológica",
        "competence": 27
    },
    {
        "id": 77,
        "title": "Implementa y valida alternativas de solución tecnológica",
        "competence": 27
    },
    {
        "id": 78,
        "title": "Evalúa y comunica el funcionamiento y los impactos de su alternativa de solución tecnológica",
        "competence": 27
    },
    {
        "id": 106,
        "title": "Conoce a Dios y asume su identidad religiosa como persona digna, libre y trascendente",
        "competence": 28
    },
    {
        "id": 107,
        "title": "Cultiva y valora las manifestaciones religiosas de su entorno argumentando su fe de manera comprensible y respetuosa",
        "competence": 28
    },
    {
        "id": 108,
        "title": "Transforma su entorno desde el encuentro personal y comunitario con Dios y desde la fe que profesa",
        "competence": 29
    },
    {
        "id": 109,
        "title": "Actúa coherentemente en razón de su fe según los principios de su conciencia moral en situaciones concretas de la vida.",
        "competence": 29
    },
    {
        "id": 103,
        "title": "Define metas de aprendizaje",
        "competence": 30
    },
    {
        "id": 104,
        "title": "Organiza acciones estratégicas para alcanzar sus metas de aprendizaje",
        "competence": 30
    },
    {
        "id": 105,
        "title": "Monitorea y ajusta su desempeño durante el proceso de aprendizaje",
        "competence": 30
    },
    {
        "id": 99,
        "title": "Personaliza entornos virtuales",
        "competence": 31
    },
    {
        "id": 100,
        "title": "Gestiona información del entorno virtual",
        "competence": 31
    },
    {
        "id": 101,
        "title": "Interactúa en entornos virtuales",
        "competence": 31
    },
    {
        "id": 102,
        "title": "Crea objetos virtuales en diversos formatos",
        "competence": 31
    }
]


export const getFilteredCompetences = (area: number) => {
    return competencies.filter(competence => competence.area == area)
}

export const getFilteredCompetenceDict = () => {
    const obj: { [key: number]: string } = {}

    competencies
    .map( competency => {
        obj[competency.id] = competency.title
    })
    return obj
}

export const getCompetency = (competencyId: number) => {
    return competencies.find( competency => competency.id == competencyId)
}

export const getFilteredCapacities = (competency: number) => {
    return capacities.filter(capacity => capacity.competence == competency)
}