import FieldError from './index';

describe('FieldError', () => {
  let renderFunc;

  beforeEach(() => {
    renderFunc = jest.fn();
  });

  it('Should return render function', () => {
    const result = FieldError({
      render: renderFunc,
      field: 'firstStep.name',
      errors: {
        firstStep: {
          name: 'Test error',
        },
      },
      touched: {
        firstStep: {
          name: true,
        },
      },
    });
    expect(renderFunc).toHaveBeenCalled();
  });

  it('Should return render function with message as prop', () => {
    const testMessage = 'Test message';
    const result = FieldError({
      render: renderFunc,
      field: 'firstStep.name',
      errors: {
        firstStep: {
          name: 'Test error',
        },
      },
      touched: {
        firstStep: {
          name: true,
        },
      },
      additionalCondition: true,
      additionalConditionErrMsg: testMessage,
    });
    expect(renderFunc).toHaveBeenCalledWith(testMessage);
  });
});
