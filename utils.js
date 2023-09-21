
/**
 * isEmailValid
 * @param {string} email - email address
 * @returns {boolean} - true if email is valid, false otherwise
 * @description - checks if email is valid
*/
const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handle Attachment Type
 * @description - Extracts attachment type from attachment path & returns http attachment type
 * @param {string} attachmentType - attachment type
 * @returns {string} - http attachment type
 */ 
const handleAttachmentType = (attachmentType) => {
    let attachmentContentType;
    switch (attachmentType) {
      case 'pdf':
        attachmentContentType = 'application/pdf';
        break;
      case 'image':
        attachmentContentType = 'image/jpeg'; 
        break;
      case 'csv':
        attachmentContentType = 'text/csv';
        break;
      case 'docx':
        attachmentContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'xlsx':
        attachmentContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'pptx':
        attachmentContentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'txt':
        attachmentContentType = 'text/plain';
        break;
      case 'html':
        attachmentContentType = 'text/html';
        break;
      case 'calendar':
        attachmentContentType = 'text/calendar';
        break;
      default:
        attachmentContentType = 'application/octet-stream';
    }
    
    return attachmentContentType;
}

module.exports = {
    handleAttachmentType,
    isEmailValid
}