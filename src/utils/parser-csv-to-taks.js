import { parse } from 'csv-parse';
function parseCsvToTasks(csvString) {


    return new Promise((resolve, reject) => {
        parse(
            csvString,
            {
                columns: true,
                trim: true,
                skip_empty_lines: true
            },
            (err, records) => {
                if (err) {
                    reject(err);
                }

                resolve(JSON.stringify(records));
            }
        );
    }
    )
}

export { parseCsvToTasks };