import Services from "../models/Services.js";

// GET ALL SERVICES (WITH SERVER-SIDE PAGINATION)
export const getAllServices = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;

    const query = { status: "active" };

    // FETCH TOTAL COUNT AND PAGINATED DATA IN PARALLEL
    const [totalServices, services] = await Promise.all([
      Services.countDocuments(query),
      Services.find(query).sort({ name: 1 }).skip(skip).limit(limit),
    ]);

    const totalPages = Math.ceil(totalServices / limit) || 1;

    return res.status(200).json({
      success: true,
      count: services.length,
      totalServices,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      services,
    });
  } catch (err) {
    console.error("Error fetching services:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
