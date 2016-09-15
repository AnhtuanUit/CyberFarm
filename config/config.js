module.exports = {
    'Env': {
        'development': {
            'Database': 'mongodb://127.0.0.1/CyberFarming',
            'Redis': {
                'Host': '127.0.0.1',
                'Port': 6379
            },
        },
        'production': {
            'Database': 'mongodb://127.0.0.1/CyberFarming',
            'Redis': {
                'Host': '127.0.0.1',
                'Port': 6379
            }
        }
    },
    'JWTSecret': 'CyberFarmingJWTSecret',
    'Populate': {
        'User': 'username avatar',
        'UserFull': '-salt -hashed_password',
    },
    'User': {
        'Role': {
            'Admin': 1,
            'User': 2
        }
    }
};
