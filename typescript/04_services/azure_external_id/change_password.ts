interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface GraphError {
  error: {
    code: string;
    message: string;
  };
}

class B2CGraphClient {
  private tenantId: string;
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;

  constructor(tenantId: string, clientId: string, clientSecret: string) {
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Get access token using client credentials flow
   */
  async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      scope: "https://graph.microsoft.com/.default",
    });

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(
          `Failed to get access token: ${response.status} ${error}`,
        );
      }

      const tokenData: TokenResponse = await response.json();
      this.accessToken = tokenData.access_token;

      console.log("✅ Successfully obtained access token");
      return this.accessToken;
    } catch (error) {
      console.error("❌ Error getting access token:", error);
      throw error;
    }
  }

  /**
   * Set password for a user
   */
  async setUserPassword(
    userId: string,
    password: string,
    forceChangePasswordNextSignIn: boolean = false,
  ): Promise<void> {
    const token = await this.getAccessToken();

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${userId}`;

    const requestBody = {
      passwordProfile: {
        password: password,
        forceChangePasswordNextSignIn: forceChangePasswordNextSignIn,
      },
    };

    try {
      const response = await fetch(graphUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
          const errorData: GraphError = JSON.parse(errorText);
          errorMessage = `${errorData.error.code}: ${errorData.error.message}`;
        } catch {
          errorMessage += ` - ${errorText}`;
        }

        throw new Error(`Failed to set password: ${errorMessage}`);
      }

      console.log(`✅ Password successfully set for user: ${userId}`);
    } catch (error) {
      console.error("❌ Error setting password:", error);
      throw error;
    }
  }

  /**
   * Get user information
   */
  async getUserInfo(userId: string): Promise<any> {
    const token = await this.getAccessToken();

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${userId}`;

    try {
      const response = await fetch(graphUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to get user info: ${response.status} ${errorText}`,
        );
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("❌ Error getting user info:", error);
      throw error;
    }
  }
}

// Example usage
async function main() {
  const clientSecret = Deno.env.get("CLIENT_SECRET")!;
  const clientId = Deno.env.get("CLIENT_ID")!;
  const tenantId = Deno.env.get("TENANT_ID")!;

  console.log("🔑 Client Secret:", clientSecret);
  // Configuration - replace with your actual values
  const config = {
    tenantId, // or your tenant GUID
    clientId,
    clientSecret,
  };

  // User details
  const userId = ""; // Object ID or User Principal Name
  const newPassword = "";

  try {
    // Initialize the client
    const client = new B2CGraphClient(
      config.tenantId,
      config.clientId,
      config.clientSecret,
    );

    // Optional: Get user info first
    console.log("📋 Getting user information...");
    const userInfo = await client.getUserInfo(userId);
    console.log(
      `User: ${userInfo.displayName} (${userInfo.userPrincipalName})`,
    );

    // Set the password
    console.log("🔐 Setting new password...");
    await client.setUserPassword(userId, newPassword, false);

    console.log("🎉 Password reset completed successfully!");
  } catch (error) {
    console.error("💥 Script failed:", error);
    Deno.exit(1);
  }
}

// Run the script
if (import.meta.main) {
  main();
}
