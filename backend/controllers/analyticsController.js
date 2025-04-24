const jobResult = require('../models/jobResult');
const { NotFoundError } = require('../errors/notFoundError');

exports.getJobResults = async (req, res) => {
    try {
        const jobResults = await jobResult.find({});
        res.status(200).json(jobResults);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job results', error });
    }
};

exports.getJobResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const jobResult = await jobResult.findById(id);
        if (!jobResult) {
            throw new NotFoundError(`Job result with id ${id} not found`);
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error fetching job result', error });
    }
    
    res.status(200).json(jobResult);
}