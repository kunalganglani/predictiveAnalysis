import AppCtrl from '../src/app/app.controller';

const assert = require('assert');

describe('AppCtrl', () => {
  it('should have default firekey', () => {
    // Arrange
    const obj = {};
    const appController = new AppCtrl(obj);
    console.log(appController);

    // Assert
    assert.equal(obj.fireKey, 'final_fired_prob_6m');
  });

  it('should have default quitKey', () => {
    // Arrange
    const obj = {};
    const appController = new AppCtrl(obj);
    console.log(appController);

    // Assert
    assert.equal(obj.quitKey, 'final_quit_prob_6m');
  });

  it('should have default duration', () => {
    // Arrange
    const obj = {};
    const appController = new AppCtrl(obj);
    console.log(appController);

    // Assert
    assert.equal(obj.user.duration, 'raw_score_stay_left_6m');
  });

  it('should have firekey as final_fired_prob_6m for 6 month duration', () => {
    // Arrange
    const obj = {};
    const appController = new AppCtrl(obj);
    obj.user.duration = 'raw_score_stay_left_6m';
    console.log(appController);

    // Act
    obj.switchDuration();

    // Assert
    assert.equal(obj.fireKey, 'final_fired_prob_6m');
  });

  it('should have firekey as final_fired_prob_1m for 1 month duration', () => {
    // Arrange
    const obj = {};
    const appController = new AppCtrl(obj);
    obj.user.duration = 'raw_score_stay_left_1m';
    console.log(appController);

    // Act
    obj.switchDuration();

    // Assert
    assert.equal(obj.fireKey, 'final_fired_prob_1m');
  });
});
