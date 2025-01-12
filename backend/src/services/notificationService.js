exports.sendNotification = async (userId, notification) => {
    // Mock implementation
    console.log('Sending notification:', {
      userId,
      ...notification,
      timestamp: new Date()
    });
    return true;
  };