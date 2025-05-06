const JobResult = require('../models/jobResult');

exports.getJobResults = async (req, res) => {
    try {
        const jobResults = await JobResult.findAll({
            include: [
                { model: Job, as: 'job' }, 
                { model: Vulnerability, as: 'vulnerabilities' }] 
            });
        res.status(200).json(jobResults);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job results', error });
    }
};

exports.getJobResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const jobResult = await JobResult.findByPk(id, {
            include: [
                { model: Job, as: 'job' }, 
                { model: Vulnerability, as: 'vulnerabilities' }] 
            });
        if (!jobResult) {
            return res.status(404).json({ message: `Job result with id ${id} not found` });
        }
        res.status(200).json(jobResult);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job result', error });
    }
}

exports.deleteJobResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await JobResult.destroy({
            where: { jobResultId: id }
        });
        if (!deleted) {
            return res.status(404).json({ message: `Job result with id ${id} not found` });
        }
        res.status(200).json({ message: 'Job result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job result', error });
    }
}