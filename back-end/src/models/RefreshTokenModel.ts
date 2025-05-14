import * as mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    token: { type: String, required: true },
    ipAddress: String,
    userAgent: String,
    expiresAt: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model("refreshTokens", refreshTokenSchema);

export default RefreshToken;