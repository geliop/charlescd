const auth = {
  access_token:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUWVhieWtWSDNQLXhDMU5iTTZsQ2NJQ1BDbE54S0FMREZ4ZWNUcWZsNlFzIn0.eyJleHAiOjE1OTA0MDY3NzgsImlhdCI6MTU5MDQwMzE3OCwianRpIjoiMWYwMGIzM2ItZDhmYy00YmI2LWIxZTItMTJkMjU0M2U5MzgxIiwiaXNzIjoiaHR0cHM6Ly9jaGFybGVzLWtleWNsb2FrLmNvbnRpbnVvdXNwbGF0Zm9ybS5jb20vYXV0aC9yZWFsbXMvZGFyd2luIiwiYXVkIjpbImRhcndpbi1jbGllbnQiLCJhY2NvdW50Il0sInN1YiI6IjJlNjIzYzE2LTNlMDctNDA4Yi04ODcwLTQ4YjkxZDZmZDY5OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImRhcndpbi1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiMzI4NjE3MmYtNjRmYS00NzQ0LWI3ZjEtNTM2MjM2ZWFjZjdjIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJtb292ZV9yZWFkIiwiY29uZmlnX3dyaXRlIiwiYWRtaW4iLCJjaXJjbGVfcmVhZCIsImNpcmNsZV93cml0ZSIsIm1vZHVsZV9yZWFkIiwiYnVpbGRfcmVhZCIsImRlcGxveV9yZWFkIiwiZGVwbG95X3dyaXRlIiwiYnVpbGRfd3JpdGUiLCJvZmZsaW5lX2FjY2VzcyIsImNvbmZpZ19yZWFkIiwibW9kdWxlX3dyaXRlIiwidW1hX2F1dGhvcml6YXRpb24iLCJtb292ZV93cml0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc1Jvb3QiOnRydWUsIm5hbWUiOiJkYXJ3aW5hZG1pbiIsIndvcmtzcGFjZXMiOlt7ImlkIjoiZTZmZWEzZDAtYjVjYi00OTIwLThjNjctZDNjNjc4MDEyZjRiIiwicGVybWlzc2lvbnMiOlsibWFpbnRlbmFuY2Vfd3JpdGUiLCJjaXJjbGVzX3dyaXRlIiwibW9kdWxlc193cml0ZSIsImh5cG90aGVzaXNfcmVhZCJdfSx7ImlkIjoiMGJjOTg2NTMtOTRkYy00OTRhLWJkZmYtOWQxN2Q0MTI3Yzg2IiwicGVybWlzc2lvbnMiOlsiaHlwb3RoZXNpc193cml0ZSIsIm1vZHVsZXNfcmVhZCIsIm1vZHVsZXNfd3JpdGUiLCJjaXJjbGVzX3JlYWQiLCJoeXBvdGhlc2lzX3JlYWQiLCJjaXJjbGVzX3dyaXRlIiwiZGVwbG95X3dyaXRlIl19LHsiaWQiOiIwZjA1NGQyMS0zZjM4LTQ3NWQtOTdlOS0zOGNjOTllYzExMTgiLCJwZXJtaXNzaW9ucyI6WyJoeXBvdGhlc2lzX3dyaXRlIiwibW9kdWxlc19yZWFkIiwibW9kdWxlc193cml0ZSIsImNpcmNsZXNfcmVhZCIsIm1haW50ZW5hbmNlX3dyaXRlIiwiaHlwb3RoZXNpc19yZWFkIiwiY2lyY2xlc193cml0ZSIsImRlcGxveV93cml0ZSJdfV0sInByZWZlcnJlZF91c2VybmFtZSI6ImRhcndpbmFkbWluQHp1cC5jb20uYnIiLCJnaXZlbl9uYW1lIjoiZGFyd2luYWRtaW4iLCJlbWFpbCI6ImRhcndpbmFkbWluQHp1cC5jb20uYnIifQ.W24AyHHcOra9i6KMUNFrqECIICm-k3MUdyuqmt1ABYL7V-RgSGX9xhedWbDPh-OV7clHAtI5NdsPMErXTQvOnWqWNnPzPvCOdaATNUeFRKSrZ8Y-bCcMxvi4ZMTXEC5Ws7zShCHgHTOP1Xfgg7L8oqrvP842b_bq3NqTx8zN4N8l92nmAemh8X2oV9Lcyzny0UJ6C6Oa_1PkHb7-2tqpkLEBzz83xABFO5ItYu2J5v6NDJjOY3XzcZpaB5mh7UCBWR92icJtJahqSoo5i9YfVgOpugDKeMTzO12TFvYeFIOodNmwrDXPa_XmlwPVDBo2u_QbOq01nP9fB3e3ia5l_w',
  expires_in: 3600,
  refresh_expires_in: 1800,
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzMTg5ZDliZC03M2U0LTQwOTItYjA0Ni1kNTk2ODE3YzFkMzIifQ.eyJleHAiOjE1OTA0MDQ5NzgsImlhdCI6MTU5MDQwMzE3OCwianRpIjoiZDBlMTI3MzctMWY5MS00NTk0LWIxMDMtZmU0MjIzNDcwYzlmIiwiaXNzIjoiaHR0cHM6Ly9jaGFybGVzLWtleWNsb2FrLmNvbnRpbnVvdXNwbGF0Zm9ybS5jb20vYXV0aC9yZWFsbXMvZGFyd2luIiwiYXVkIjoiaHR0cHM6Ly9jaGFybGVzLWtleWNsb2FrLmNvbnRpbnVvdXNwbGF0Zm9ybS5jb20vYXV0aC9yZWFsbXMvZGFyd2luIiwic3ViIjoiMmU2MjNjMTYtM2UwNy00MDhiLTg4NzAtNDhiOTFkNmZkNjk5IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImRhcndpbi1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiMzI4NjE3MmYtNjRmYS00NzQ0LWI3ZjEtNTM2MjM2ZWFjZjdjIiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIn0.Gxnngnwx9Q0HLAOHUA4MiOa6khvpppMvcgoknbKUQFI',
  token_type: 'bearer',
  'not-before-policy': 0,
  session_state: '3286172f-64fa-4744-b7f1-536236eacf7c',
  scope: 'profile email'
};

module.exports = {
  auth
};
