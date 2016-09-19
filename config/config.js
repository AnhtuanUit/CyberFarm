module.exports = {
    'Env': {
        'development': {
            'Database': 'mongodb://127.0.0.1/CyberFarming',
            'Image': 'http://www.thegameengineer.com/blog/wp-content/uploads/2012/03/engineer.png',
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
    },
    'Device': {
        'Type': {
            'Gateway': 1,
            'Van': 2,
            'Motor': 3,
            'Sensor': 4
        },
        'MAC': {
            'Prefix': 'cf',
            'Format': ':',
            'Case': 'lowercase',
            'Type': {
                'Gateway': '01',
                'Van': '02',
                'Motor': '03',
                'Sensor': '04'
            }
        }
    }
    
};
