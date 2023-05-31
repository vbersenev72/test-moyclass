
const pool = require('../db')





class DataController {
    async getAll(req, res) {
        try {
            let {date, status, teachersId, studentsCount, page, lessonsPerPage} = req.body

            if (date) date = [date]
            if (teachersId) teachersId = [teachersId]

            if (date.length = 1) {
                let lessonsByData = await pool.query('SELECT * FROM lessons WHERE date=$1;', [date])

                let idLessons = []
                lessonsByData.rows.map((el) => idLessons.push(el.id))

                let studentsID = []
                for (let i = 0; i < idLessons.length; i++) {
                    const element = idLessons[i];
                    const res = await pool.query('SELECT student_id FROM lesson_students WHERE lesson_id = $1', [element])
                    studentsID.push(res.rows)
                }


                let students = []
                for (let i = 0; i < studentsID.length; i++) {
                    const element = studentsID[i]?.[0]?.student_id

                    const res = await pool.query('SELECT * FROM students WHERE id = $1', [element])
                    let visit = await pool.query('SELECT visit FROM lesson_students WHERE student_id = $1', [element])

                    const student = {
                        id: res.rows[0]?.id,
                        name: res.rows[0]?.name,
                        visit: visit.rows[0]?.visit
                    }

                    students.push(student) // запушили студентов
                }



                let teachers = []
                for (let i = 0; i < idLessons.length; i++) {
                    const element = idLessons[i];
                    let newTeachers = await pool.query('SELECT * FROM lesson_teachers WHERE teacher_id = $1', [element]) ///////////////////

                }





                return res.json({message: {lesson: lessonsByData.rows, students}})
            }

        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "error", error})
        }
    }
}

module.exports = new DataController()