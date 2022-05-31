import React from "react";
// we'll need InteractiveBrowserCredential here to force a user to sign-in through the browser
import { InteractiveBrowserCredential } from "@azure/identity";
// we're using these objects from the storage sdk - there are others for different needs
import { BlobServiceClient, BlobItem } from "@azure/storage-blob";
const {
  TableServiceClient,
  AzureNamedKeyCredential,
} = require("@azure/data-tables");

interface Props {}
interface State {
  // a place to store our blob item metadata after we query them from the service
  blobsWeFound: BlobItem[];
  containerUrl: string;
}

export class Percobaan extends React.Component<Props, State> {
  state: State;

  constructor(props: Props, state: State) {
    //super(state);
    super(props, state);
    this.state = { blobsWeFound: [], containerUrl: "" };
  }

  // here's our azure identity config
  async componentDidMount() {
    const account = "ecomindostorage";
    const accountKey =
      "PGwVzRVmBIxZoqvwEq1kCX6V18QeM+j/WA/TM55VBIcAg6ut61jvao5T09IaJ95XeTBXDMpP70BN+AStCuy9MQ==";

    const credential = new AzureNamedKeyCredential(account, accountKey);
    const serviceClient = new TableServiceClient(
      `https://${account}.table.core.windows.net`,
      credential
    );
    let tablesIter = serviceClient.listTables();
    let i = 1;
    for await (const table of tablesIter) {
      console.log(`Table${i}: ${table.name}`);
      i++;
      // Output:
      // Table1: testTable1
      // Table1: testTable2
      // Table1: testTable3
      // Table1: testTable4
      // Table1: testTable5
    }
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>blob name</th>
              <th>blob size</th>
              <th>download url</th>
            </tr>
          </thead>
          <tbody>
            {this.state.blobsWeFound.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.name}</td>
                  <td>{x.properties.contentLength}</td>
                  <td>
                    <img
                      src={this.state.containerUrl + x.name}
                      alt={this.state.containerUrl + x.name}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
