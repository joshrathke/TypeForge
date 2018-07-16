import { GatewayModule } from './gateway.module';

describe('GatewayModule', () => {
  let gatewayModule: GatewayModule;

  beforeEach(() => {
    gatewayModule = new GatewayModule();
  });

  it('should create an instance', () => {
    expect(gatewayModule).toBeTruthy();
  });
});
