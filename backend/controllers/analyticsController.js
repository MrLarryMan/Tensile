const jobResult = require('../models/jobResult');
const { NotFoundError } = require('../errors/notFoundError');

exports.getJobResults = async (req, res) => {
    try {
        const jobResults = await jobResult.getAll();
        res.status(200).json(jobResults);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job results', error });
    }
};

exports.getJobResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const jobResult = await jobResult.getById(id);
        if (!jobResult) {
            throw new NotFoundError(`Job result with id ${id} not found`);
        }
        res.status(200).json(jobResult);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error fetching job result', error });
    }
}

exports.deleteJobResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJobResult = await jobResult.deleteById(id);
        if (!deletedJobResult) {
            throw new NotFoundError(`Job result with id ${id} not found`);
        }
        res.status(200).json({ message: 'Job result deleted successfully' });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error deleting job result', error });
    }
}