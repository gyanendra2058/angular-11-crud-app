/**
 * Class for parsing and giving access to the VCAP service bindings and config.
 */
export class VcapServices {
  private vcapServices: any;
  private serviceCredentials: {} = {};
  private vcapApplication: any;

  constructor(vcapServicesString: string, vcapApplication: string) {
    this.parseVcapServices(vcapServicesString);
    this.vcapApplication = JSON.parse(vcapApplication) || {};
  }

  private parseVcapServices(vcapServicesString: string) {
    this.vcapServices = JSON.parse(vcapServicesString);

    let serviceName;
    for (const service of this.vcapServices['user-provided']) {
      serviceName = service['name'];
      console.log('Found service binding: ' + serviceName);
      this.serviceCredentials[serviceName] = service;
    }
  }

  public getApplicationUri(appName: string): string {
    return this.serviceCredentials[appName]['credentials']['uri'] || null;
  }

  public getTrustedUri(): string {
    return (
      this.serviceCredentials['stuf']['credentials']['trustedIssuer'] || null
    );
  }

  public getUserServicesUrl(): any {
    return (
      this.serviceCredentials['stuf']['credentials']['userServiceUrl'] || null
    );
  }

  public getTenantServicesUrl(): any {
    return (
      this.serviceCredentials['stuf']['credentials']['tenantServiceUrl'] || null
    );
  }

  public getUaaUrl(): any {
    return this.serviceCredentials['stuf']['credentials']['uaaUrl'] || null;
  }

  // return the application_id from VCAP_APPLICATION for logging purposes
  public getApplicationId(): string {
    return this.vcapApplication.application_id || 'na';
  }

  // return the application_name from VCAP_APPLICATION for logging purposes
  public getApplicationName(): string {
    return this.vcapApplication.application_name || 'na';
  }

  // return the instance_index from VCAP_APPLICATION for logging purposes
  public getInstanceIndex(): string {
    return this.vcapApplication.instance_index || 'na';
  }
}
