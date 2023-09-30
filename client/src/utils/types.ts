export type Level = {
    id: string,
    name: string
};

export type Student = {
    run: number | string;
    dv?: string;
    name: string;
    first_surname: string;
    second_surname: string;
    level: string;
};

export type Grade = {
    id: number,
    name: string,
    date: Date,
    classGroupId: number,
    Results: {
        examId: number,
        studentId: number,
        grade: number
    }[],
    classgroup: {
        teacherId: number,
        group: { letter: string, topic: string }
    }
}

export type User = {
    rut: number
    name: string
}
