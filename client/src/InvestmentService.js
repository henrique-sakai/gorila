import axios from 'axios';

const url = 'investments/'

class InvestmentService {
    static getInvestments() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;

                resolve(
                    data.map(investment => ({
                        ...investment
                    }))
                );
            } catch(err) {
                reject(err);
            }
        })
    }
    static insertInvestment(newInvestment) {
        let urlr = url + 'id';
        newInvestment.date = newInvestment.date.split('-').reverse().join('/');

        return axios.post(urlr, {
            type: newInvestment.type,
            value: newInvestment.value,
            date: newInvestment.date
        });
    }
    static delInvestment(investment_id) {
        let del_url = url + investment_id;
        return axios.delete(del_url);
    }
}

export default InvestmentService;