module.exports = function buildResponse(data = null, message = 'Success', statusCode = 200, options = {}) {
    return {
        status: statusCode,         // Mã trạng thái HTTP
        message: message,           // Thông điệp phản hồi
        data: data,            // Dữ liệu trả về, mặc định là null
        ...options,                 // Các thông số khác
    };
}
