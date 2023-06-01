import { Expose } from "class-transformer";

interface ICertificateInfo {
    ExpireDate:   Date;
    StartDate:    Date;
    KeyUsage:     string;
    Thumbprint:   string;
    Edrpou:       string;
    Drfo:         string;
    FullName:     string;
    OrgUnit:      string;
    Org:          string;
    Address:      string;
    Phone:        string;
    EMail:        string;
    SubjectTitle: string;
    Issuer:       string;
    IssuerCN:     string;
    Serial:       string;
    ExtKeyUsage:  string;
    Upn:          string;
    PowerCert:    boolean;
    QSCD:         boolean;
    CommonName:   string;
}

export default class CertificateInfo implements ICertificateInfo {
    @Expose() public ExpireDate: Date;
    @Expose() public StartDate: Date;
    @Expose() public KeyUsage: string;
    @Expose() public Thumbprint: string;
    @Expose() public Edrpou: string;
    @Expose() public Drfo: string;
    @Expose() public FullName: string;
    @Expose() public OrgUnit: string;
    @Expose() public Org: string;
    @Expose() public Address: string;
    @Expose() public Phone: string;
    @Expose() public EMail: string;
    @Expose() public SubjectTitle: string;
    @Expose() public Issuer: string;
    @Expose() public IssuerCN: string;
    @Expose() public Serial: string;
    @Expose() public ExtKeyUsage: string;
    @Expose() public Upn: string;
    @Expose() public  PowerCert: boolean;
    @Expose() public QSCD: boolean;
    @Expose() public CommonName: string;
}