import { SaleManagementService } from "./SaleManagementService"
import { Client } from "./Client";

// state

const salesService = new SaleManagementService();

const payment1 = salesService.getPayement(new Client('andrii', 'koval', new Date('03/08/2020'), new Date('2017/07/25')), 100);
console.log('payment1:', payment1);
const payment2 = salesService.getPayement(new Client('andrii', 'koval', new Date('03/01/2020'), new Date('2020/07/25')), 111);
console.log('payment2:', payment2);