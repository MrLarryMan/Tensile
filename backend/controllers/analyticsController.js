const jobResultModel = require('../models/jobResultModel');

exports.getJobResults = async (req, res) => {
    try {
        const jobResults = await jobResultModel.getAll();
        res.status(200).json(jobResults);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job results', error });
    }
};

exports.getJobResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const jobResult = await jobResultModel.getById(id);
        if (!jobResult) {
            throw new Error(`Job result with id ${id} not found`);
        }
        res.status(200).json(jobResult);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job result', error });
    }
}

exports.deleteJobResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJobResult = await jobResultModel.deleteById(id);
        if (!deletedJobResult) {
            throw new Error(`Job result with id ${id} not found`);
        }
        res.status(200).json({ message: 'Job result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job result', error });
    }
}