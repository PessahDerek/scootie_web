import {Component, Input} from "@angular/core";
import {defaultBike} from "../../../libs/defaults/default_data";
import {NgForOf} from "@angular/common";
import {readable} from "../../../libs/methods/shared";


@Component({
  standalone: true,
  selector: 'bike-details',
  imports: [
    NgForOf
  ],
  template: `
    <table class="w-full">
      <tbody class="grid gap-2 sm md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <tr class="grid grid-cols-2 {{(i % 3) === 0 ? 'bg-gray-100':''}}" *ngFor="let key of keys; index as i">
        <th class="text-left">{{ readable(key) }}</th>
        <td>{{ bike[key] }}</td>
      </tr>
      </tbody>
    </table>
  `
})
export class DetailComponent {
  keys = [
    "category",
    "frame",
    "speed_gear",
    "fork",
    "max_load",
    "motor_voltage",
    "motor_power",
    "motor_type",
    "range",
    "display",
    "brake",
    "battery_voltage",
    "battery_capacity",
    "battery_type",
    "tyre_size",
    "carton",
    "stock",
    "net_weight",
    "gross_weight"
  ];
  @Input() bike: BikeObj = defaultBike;


  protected readonly readable = readable;
}

